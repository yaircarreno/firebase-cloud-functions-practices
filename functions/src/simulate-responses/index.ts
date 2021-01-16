import * as functions from "firebase-functions";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const simulateResponses = functions.https.onRequest(async (req, res) => {
  const typeSimulation = req.query.typeSimulation;

  if (typeSimulation === "Latency") {
    setTimeout(() => {
      sendResponse(res, 200, typeSimulation);
    }, 3000);
  } else if (typeSimulation === "Error") {
    sendResponse(res, 500, typeSimulation);
  } else if (typeSimulation === "Success") {
    sendResponse(res, 200, typeSimulation);
  } else {
    sendResponse(res, 201, "undefined");
  }
});
/**
 * Return response with multiples fail simulated
 * @param {any} res response
 * @param {number} code Code response
 * @param {string} typeSimulation Type of simulation
 */
function sendResponse(res: any, code: number, typeSimulation: string) {
  functions.logger
      .info(`Simulating Circuit Breaker Pattern with ${typeSimulation} case.`,
          {structuredData: true});
  res.status(code).send({data: `Response ${typeSimulation}!`});
}
