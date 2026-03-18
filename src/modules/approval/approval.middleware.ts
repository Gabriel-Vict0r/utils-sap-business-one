export const validateStepCodeUserId = (req: any, res: any, next: any) => {
  // Middleware para validar o corpo da requisição
  const { stepCode, userId } = req.body;
  const stepCodeNum = Number(stepCode);
  const userIdNum = Number(userId);
  if (stepCode === undefined || userId === undefined) {
    return res
      .status(400)
      .json({ error: "Código de etapa e ID de usuário são obrigatórios" });
  }
  if (isNaN(stepCodeNum) || stepCodeNum < -32768 || stepCodeNum > 32767) {
    return res.status(400).json({
      error:
        "Código de etapa inválido ou fora do range permitido para SMALLINT",
    });
  }
  if (isNaN(userIdNum) || userIdNum < -32768 || userIdNum > 32767) {
    return res.status(400).json({
      error: "ID de usuário inválido ou fora do range permitido para SMALLINT",
    });
  }
  next();
};

export const validateStepCode = (req: any, res: any, next: any) => {
  const { stepCode } = req.params;
  const stepCodeNum = Number(stepCode);
  if (isNaN(stepCodeNum) || stepCodeNum < -32768 || stepCodeNum > 32767) {
    return res.status(400).json({
      error:
        "Código de etapa inválido ou fora do range permitido para SMALLINT",
    });
  }
  next();
};
