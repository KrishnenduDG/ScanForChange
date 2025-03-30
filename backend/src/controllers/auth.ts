import { Request, Response } from "express";
import { failureLabel, successLabel, USER_LABEL } from "../constants";
import { RoleRepo, UserRepo, WasteReportRepo } from "../repository";
import { generateToken } from "../utils/jwt";
import { comparePasswords } from "../utils/password";

class AuthController {
  static handleSignup = async (
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response
  ) => {
    try {
      const targetUser = await UserRepo.findByEmail(req.body.email);
      const targetRole = await RoleRepo.findByName(USER_LABEL);

      if (targetUser) {
        res.status(409).json({
          status: failureLabel,
          msg: "User with same email already exists",
        });
      } else {
        await UserRepo.create(
          req.body.email,
          req.body.password,
          targetRole?.id_pk!
        );
        res
          .status(201)
          .json({ status: successLabel, msg: "User successfully created" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ status: failureLabel, msg: "Internal Server Error" });
    }
  };
  static handleLogin = async (
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response
  ) => {
    try {
      const targetUser = await UserRepo.findByEmail(req.body.email);

      if (!targetUser) {
        res.status(404).json({
          status: failureLabel,
          msg: "User does not exist",
        });
      } else {
        const targetRole = await RoleRepo.findByIdPk(targetUser.roleId);

        if (!(await comparePasswords(req.body.password, targetUser.password))) {
          res
            .status(401)
            .json({ status: failureLabel, msg: "Invalid Credentials" });
        } else {
          res.status(200).json({
            status: successLabel,
            msg: "User logged In",
            role: targetRole?.name,
            token: generateToken({ uid: targetUser.uid }),
          });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ status: failureLabel, msg: "Internal Server Error" });
    }
  };

  static handleGetProfile = async (
    req: Request,
    res: Response<{}, { user: IUser; role: string }>
  ) => {
    const userDetails = res.locals.user;

    try {
      const targetReports = await WasteReportRepo.getByUserId(
        res.locals.user.id_pk
      );

      const leaderboard = await UserRepo.getLeaderboard();
      let rank;
      for (let i = 0; i < leaderboard.length; i++) {
        if (leaderboard[i].id_pk == res.locals.user.id_pk) {
          rank = i + 1;
          break;
        }
      }

      res.status(200).json({
        status: successLabel,
        msg: "User profile fetched",
        data: {
          email: userDetails.email,
          joinedAt: userDetails.joinedAt,
          uid: userDetails.uid,
          role: res.locals.role,
          points: res.locals.user.total_points,
          rank: rank,
          reports: targetReports.map((report) => {
            return {
              imgUrl: report.imgUrl,
              location: report.location,
              reported_at: report.reported_at,
              points_earned: report.points_earned,
              wastes_reported: report.wastes_reported,
            };
          }),
        },
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: failureLabel, msg: "Internal Server Error" });
    }
  };
}

export default AuthController;
