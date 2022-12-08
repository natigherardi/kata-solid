import TelemetryClient from "./telemetry-client";
import TelemetryDiagnosticControls from "./telemetry-diagnostic-controls";

jest.mock("./telemetry-client");

let mockOnlineStatus = jest.fn();

beforeAll(() => {
  (TelemetryClient as jest.Mock<any, any>).mockImplementation(() => ({
    getOnlineStatus: mockOnlineStatus,
    receive: () => "test",
    disconnect: () => {},
    diagnosticMessage: () => {},
    send: () => {},
    connect: () => {},
  }));
});

describe("Given the Telemetry System", () => {
  describe("When the user wants to receive a diagnostic", () => {
    const expectedDiagnostic = "test";

    it("Then if the connection is successfull, the diagnostic information should be received", () => {
      const telemetry = new TelemetryDiagnosticControls();
      mockOnlineStatus.mockImplementationOnce(() => true);

      telemetry.checkTransmission();

      expect(telemetry.readDiagnosticInfo()).toStrictEqual(expectedDiagnostic);
    });

    it("Then if the connection fails and its retried successfully, the diagnostic information should be received", () => {
      const telemetry = new TelemetryDiagnosticControls();
      mockOnlineStatus.mockReturnValueOnce(false);
      mockOnlineStatus.mockReturnValueOnce(true);

      telemetry.checkTransmission();

      expect(telemetry.readDiagnosticInfo()).toStrictEqual(expectedDiagnostic);
    });

    it("Then if the connection fails more than 3 times, an error should be thrown", () => {});
  });
});
