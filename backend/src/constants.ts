const successLabel = "success";
const failureLabel = "failure";

const USER_LABEL = "user";
const ADMIN_LABEL = "admin";
const roles = [USER_LABEL, ADMIN_LABEL];
const JWT_TOKEN_EXPIRY = "24h";
const PASSWORD_SALT_ROUNDS = 10;

const WASTE_CATEGORIES = [
  {
    name: "Food Waste",
    desc: "Biodegradable waste from kitchens, restaurants, and food processing units.",
    points: 10,
  },
  {
    name: "Garden Waste",
    desc: "Leaves, grass clippings, branches, and other plant-based waste.",
    points: 10,
  },

  {
    name: "Paper Waste",
    desc: "Used paper products like newspapers, tissues, and office paper.",
    points: 8,
  },
  {
    name: "Wood Waste",
    desc: "Discarded wooden materials from furniture, construction, and packaging.",
    points: 8,
  },
  {
    name: "Plastic Waste",
    desc: "Recyclable plastics including bottles, containers, and packaging materials.",
    points: 8,
  },
  {
    name: "Glass Waste",
    desc: "Glass items such as bottles, jars, and broken glassware.",
    points: 8,
  },
  {
    name: "Metal Waste",
    desc: "Scrap metals including aluminum cans, steel, and copper.",
    points: 8,
  },
  {
    name: "Paper & Cardboard Waste",
    desc: "Recyclable paper and cardboard materials used in packaging and printing.",
    points: 8,
  },

  {
    name: "Small Electronic Waste",
    desc: "Small electronic devices like phones, remotes, and USB drives.",
    points: 7,
  },
  {
    name: "Large Electronic Waste",
    desc: "Larger devices such as TVs, refrigerators, and washing machines.",
    points: 7,
  },
  {
    name: "Battery Waste",
    desc: "Discarded batteries from electronics, vehicles, and appliances.",
    points: 7,
  },
  {
    name: "Wiring & Cables",
    desc: "Electrical wires, cables, and connectors from old devices.",
    points: 7,
  },

  {
    name: "Chemical Waste",
    desc: "Industrial and household chemicals such as acids, solvents, and disinfectants.",
    points: 3,
  },
  {
    name: "Toxic Waste",
    desc: "Harmful waste including pesticides, fertilizers, and toxic metals.",
    points: 5,
  },
  {
    name: "Flammable Waste",
    desc: "Highly flammable substances like gasoline, alcohol, and aerosol cans.",
    points: 5,
  },
  {
    name: "Radioactive Waste",
    desc: "Waste containing radioactive materials from medical, industrial, or nuclear sources.",
    points: 5,
  },

  {
    name: "Mixed Plastics",
    desc: "Plastics that cannot be recycled due to mixed composition.",
    points: 6,
  },
  {
    name: "Composite Materials",
    desc: "Materials made from multiple substances, like Tetra Pak and laminated paper.",
    points: 6,
  },
  {
    name: "Contaminated Waste",
    desc: "Soiled or hazardous items that cannot be processed for recycling.",
    points: 5,
  },

  {
    name: "Concrete & Cement Waste",
    desc: "Leftover concrete, cement, and mortar from construction sites.",
    points: 6,
  },
  {
    name: "Bricks & Tiles Waste",
    desc: "Broken bricks, ceramic tiles, and stone debris.",
    points: 6,
  },
  {
    name: "Insulation Materials",
    desc: "Foam, fiberglass, and other insulating materials used in construction.",
    points: 6,
  },
  {
    name: "Asphalt & Roofing Waste",
    desc: "Discarded asphalt, shingles, and roofing materials.",
    points: 6,
  },

  {
    name: "Cotton & Natural Fabrics",
    desc: "Clothing, linens, and textiles made from natural fibers.",
    points: 6,
  },
  {
    name: "Synthetic Fabric Waste",
    desc: "Discarded polyester, nylon, and other synthetic textiles.",
    points: 6,
  },
  {
    name: "Leather Waste",
    desc: "Scraps and worn-out leather products from shoes, bags, and furniture.",
    points: 6,
  },

  {
    name: "Infectious Waste",
    desc: "Medical waste contaminated with pathogens, including used dressings and tissues.",
    points: 4,
  },
  {
    name: "Sharps Waste",
    desc: "Needles, syringes, and other sharp medical instruments.",
    points: 4,
  },
  {
    name: "Pharmaceutical Waste",
    desc: "Expired medicines, pills, and chemical-based medical products.",
    points: 4,
  },
  {
    name: "Pathological Waste",
    desc: "Human tissues, organs, and fluids discarded from medical procedures.",
    points: 4,
  },

  {
    name: "Metal Scraps",
    desc: "Leftover or discarded metal materials from industrial processes.",
    points: 3,
  },
  {
    name: "Toxic Sludge",
    desc: "Residues from chemical processing that contain hazardous substances.",
    points: 3,
  },
  {
    name: "Chemical Residues",
    desc: "Leftover industrial chemicals and byproducts.",
    points: 3,
  },
  {
    name: "Factory Emissions",
    desc: "Airborne and liquid waste expelled from industrial factories.",
    points: 3,
  },

  {
    name: "Detergent & Soap Waste",
    desc: "Leftover soaps, detergents, and cleaning agents from homes and industries.",
    points: 3,
  },
  {
    name: "Paint & Solvent Waste",
    desc: "Unused or expired paints, thinners, and solvents.",
    points: 3,
  },
  {
    name: "Pesticide & Herbicide Waste",
    desc: "Harmful chemicals used in agriculture and pest control.",
    points: 3,
  },
  {
    name: "Oil & Grease Waste",
    desc: "Used motor oil, cooking grease, and lubricants.",
    points: 3,
  },
];

export {
  ADMIN_LABEL,
  failureLabel,
  JWT_TOKEN_EXPIRY,
  PASSWORD_SALT_ROUNDS,
  roles,
  successLabel,
  USER_LABEL,
  WASTE_CATEGORIES,
};
