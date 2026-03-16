import { getConnection } from "../../database/hana";
import {
  StepWithApprover,
  StepWithApproverResponse,
  User,
} from "../../types/approval.interfaces";

export class ApprovalRepository {
  async findApproversByStepCode(stepCode: number) {
    const conn = await getConnection();
    const query = `SELECT U."USERID" AS "id", U."U_NAME"   AS "Usuario" FROM ${process.env.SCHEMA}."WST1" M JOIN ${process.env.SCHEMA}."OUSR" U  ON U."USERID"  = M."UserID" WHERE M."WstCode" = ?`;
    const result = await conn.exec(query, [stepCode]);
    //console.log(result);
    return result;
  }

  async insertMissingOriginators() {
    const conn = await getConnection();
    const query = `INSERT INTO ${process.env.SCHEMA}."WTM1" ("WtmCode", "UserID")
SELECT 
    C."Modelo",
    C."UserID"
FROM (
  SELECT 
      M."WtmCode"        AS "Modelo",
      U."USERID"         AS "UserID"
  FROM ${process.env.SCHEMA}."OWTM" M
  JOIN ${process.env.SCHEMA}."OUSR" U
    ON U."Locked" = 'N'                       -- apenas usuários ativos
  WHERE 
      /* NÃO é aprovador em nenhuma etapa deste modelo */
      NOT EXISTS (
        SELECT 1
          FROM ${process.env.SCHEMA}."WTM2" W2
          JOIN ${process.env.SCHEMA}."WST1" K
            ON K."WstCode" = W2."WstCode"
         WHERE W2."WtmCode" = M."WtmCode"
           AND K."UserID"   = U."USERID"
      )
      /* AINDA não está como autor/originador neste modelo */
      AND NOT EXISTS (
        SELECT 1
          FROM ${process.env.SCHEMA}."WTM1" A
         WHERE A."WtmCode" = M."WtmCode"
           AND A."UserID"  = U."USERID"
      )
) C
ORDER BY C."Modelo", C."UserID";`;
    try {
      const result = await conn.exec(query);
      await conn.exec("COMMIT");
      return result;
    } catch (error) {
      await conn.exec("ROLLBACK");
      throw error;
    }
  }

  async findStepsWithApprover(): Promise<StepWithApproverResponse[]> {
    const conn = await getConnection();

    const query = `SELECT 
  S."WstCode",
  S."Name",
  U."USERID",
  U."U_NAME"   AS "Usuario"
FROM ${process.env.SCHEMA}."OWST" S
JOIN ${process.env.SCHEMA}."WST1" M  ON M."WstCode" = S."WstCode"
JOIN ${process.env.SCHEMA}."OUSR" U  ON U."USERID"  = M."UserID"
ORDER BY S."WstCode", U."U_NAME"`;
    const result = await conn.exec(query);

    return result as StepWithApproverResponse[];
  }

  async getUsers() {
    const conn = await getConnection();

    const query = `SELECT "USERID", "U_NAME" FROM ${process.env.SCHEMA}."OUSR" WHERE "Locked" = 'N'`;
    const result = await conn.exec(query);
    return result;
  }
}
