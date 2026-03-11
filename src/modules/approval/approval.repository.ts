import { getConnection } from "../../database/hana";

export class ApprovalRepository {
  async findApproversByStepCode(stepCode: number) {
    const conn = await getConnection();
    const query =
      'SELECT U."USERID" AS "id", U."U_NAME"   AS "Usuario" FROM SBOGRUPOSERIOS."WST1" M JOIN SBOGRUPOSERIOS."OUSR" U  ON U."USERID"  = M."UserID" WHERE M."WstCode" = ?';
    const result = await conn.exec(query, [stepCode]);
    //console.log(result);
    return result;
  }

  async insertMissingOriginators() {
    const conn = await getConnection();
    const query = `INSERT INTO SBOGRUPOSERIOS."WTM1" ("WtmCode", "UserID")
SELECT 
    C."Modelo",
    C."UserID"
FROM (
  SELECT 
      M."WtmCode"        AS "Modelo",
      U."USERID"         AS "UserID"
  FROM SBOGRUPOSERIOS."OWTM" M
  JOIN SBOGRUPOSERIOS."OUSR" U
    ON U."Locked" = 'N'                       -- apenas usuários ativos
  WHERE 
      /* NÃO é aprovador em nenhuma etapa deste modelo */
      NOT EXISTS (
        SELECT 1
          FROM SBOGRUPOSERIOS."WTM2" W2
          JOIN SBOGRUPOSERIOS."WST1" K
            ON K."WstCode" = W2."WstCode"
         WHERE W2."WtmCode" = M."WtmCode"
           AND K."UserID"   = U."USERID"
      )
      /* AINDA não está como autor/originador neste modelo */
      AND NOT EXISTS (
        SELECT 1
          FROM SBOGRUPOSERIOS."WTM1" A
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
}
