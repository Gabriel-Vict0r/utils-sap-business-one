import { getConnection } from "../../database/hana";



export class ApprovalRepository {

  async findApproversByStepCode(stepCode: number) {
    const conn = await getConnection();
    const query = 'SELECT U."USERID" AS "id", U."U_NAME"   AS "Usuario" FROM SBOGRUPOSERIOS."WST1" M JOIN SBOGRUPOSERIOS."OUSR" U  ON U."USERID"  = M."UserID" WHERE M."WstCode" = ?';
    const result = await conn.exec(query, [stepCode]);
    //console.log(result);
    return result;
  }
}