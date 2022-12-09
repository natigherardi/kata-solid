import TelemetryClientI from "./models/TelemetryClient";
import TelemetryClient from "./telemetry-client";
import TelemetryDiagnosticControls from "./telemetry-diagnostic-controls";

describe("Given the Telemetry System", () => {
  const diagnostic = "test";
  const mockTelemetryClient = {
    getOnlineStatus: jest.fn(),
    receive: () => diagnostic,
    disconnect: () => {},
    diagnosticMessage: () => "",
    send: () => {},
    connect: () => {},
  };
  describe("When the user wants to receive a diagnostic", () => {
    it("Then if the connection is successfull, the diagnostic information should be received", () => {
      const telemetry = new TelemetryDiagnosticControls(mockTelemetryClient);
      mockTelemetryClient.getOnlineStatus.mockResolvedValue(true);

      telemetry.checkTransmission();

      expect(telemetry.readDiagnosticInfo()).toStrictEqual(diagnostic);
    });

    it("Then if the connection fails and its retried successfully, the diagnostic information should be received", () => {
      mockTelemetryClient.getOnlineStatus.mockReturnValueOnce(false);
      const telemetry = new TelemetryDiagnosticControls(mockTelemetryClient);
      mockTelemetryClient.getOnlineStatus.mockReturnValueOnce(true);

      telemetry.checkTransmission();

      expect(telemetry.readDiagnosticInfo()).toStrictEqual(diagnostic);
    });

    it.only("Then if the connection fails more than 3 times, an error should be thrown", () => {
      const telemetry = new TelemetryDiagnosticControls(mockTelemetryClient);
      mockTelemetryClient.getOnlineStatus.mockReturnValue(false);

      expect(telemetry.checkTransmission()).toThrowError("Unable to connect");
    });
  });
});
