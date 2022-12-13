import TelemetryClient from "../telemetry-client/telemetry-client";

export default class TelemetryDiagnosticInfo {
  private telemetryClient: TelemetryClient = new TelemetryClient();
  private diagnosticInfo: string = "";

  public writeDiagnosticInfo() {
    this.diagnosticInfo = this.telemetryClient.receive();
  }

  public readDiagnosticInfo() {
    return this.diagnosticInfo;
  }

  public sendDiagnosticInfo() {
    this.telemetryClient.send(this.telemetryClient.diagnosticMessage());
  }
}
