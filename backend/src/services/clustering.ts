import { PrismaClient } from "@prisma/client";
import fs from "fs";
const { kmeans } = require("ml-kmeans");

const prisma = new PrismaClient();

async function fetchWasteReportDetails(): Promise<
  { location: number[]; category_name: string }[]
> {
  return await prisma.$queryRaw`SELECT * FROM waste_report_details`;
}

function determineClusterCount(dataLength: number): number {
  return Math.max(1, Math.ceil(Math.sqrt(dataLength / 3))); // Adjusted dynamic cluster count
}

function isDenseCluster(cluster: number[], threshold: number = 3): boolean {
  return cluster.length >= threshold; // Only consider clusters with at least 'threshold' points
}

function clusterWasteReports(
  wasteReports: { location: number[]; category_name: string }[]
): Record<string, any[]> {
  // Group by category
  const categoryClusters: Record<string, any[]> = {};

  wasteReports.forEach((report) => {
    if (!categoryClusters[report.category_name]) {
      categoryClusters[report.category_name] = [];
    }
    categoryClusters[report.category_name].push(report);
  });

  // Cluster by region using K-Means
  Object.keys(categoryClusters).forEach((category) => {
    const reports = categoryClusters[category];
    const locations = reports.map((report) => report.location); // Assuming [lat, lng]

    const numClusters = determineClusterCount(locations.length);

    if (locations.length > 1) {
      const result = kmeans(locations, numClusters); // Correct usage

      const clusteredReports = result.clusters.map(
        (clusterIndex: number, i: number) => ({
          ...reports[i],
          cluster: clusterIndex,
        })
      );

      // Filter out sparse clusters
      const filteredClusters = clusteredReports.reduce(
        (acc: any, report: any) => {
          if (!acc[report.cluster]) acc[report.cluster] = [];
          acc[report.cluster].push(report);
          return acc;
        },
        {} as Record<number, any[]>
      );

      categoryClusters[category] = Object.values(filteredClusters).filter(
        (cluster) => isDenseCluster(cluster as any)
      );
    }
  });

  return categoryClusters;
}

(async () => {
  const wasteReports = await fetchWasteReportDetails();
  const clusteredData = clusterWasteReports(wasteReports);

  // Export to file
  fs.writeFileSync(
    "waste_clusters.json",
    JSON.stringify(clusteredData, null, 2)
  );
  console.log("Clusters saved to waste_clusters.json");

  await prisma.$disconnect();
})();

const a = 10;
export default a;
