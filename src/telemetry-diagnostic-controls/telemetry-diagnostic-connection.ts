import TelemetryClient from "../telemetry-client/telemetry-client";
import TelemetryDiagnosticInfo from "./telemetry-diagnostic-info";

export default class TelemetryDiagnosticConnection {
  private diagnosticChannelConnectionString: string = "*111#";
  private telemetryClient: TelemetryClient = new TelemetryClient();
  private telemetryDiagnosticInfo: TelemetryDiagnosticInfo =
    new TelemetryDiagnosticInfo();

  public disconnect() {
    this.telemetryClient.disconnect();
  }

  public connect(): boolean {
    let retryLeft = 3;
    while (this.telemetryClient.getOnlineStatus() === false && retryLeft > 0) {
      this.telemetryClient.connect(this.diagnosticChannelConnectionString);
      retryLeft -= 1;
    }

    if (this.telemetryClient.getOnlineStatus() === false) {
      throw new Error("Unable to connect");
    }

    return this.telemetryClient.getOnlineStatus() === true;
  }

  public checkTransmission() {
    this.telemetryDiagnosticInfo.sendDiagnosticInfo();
    this.telemetryDiagnosticInfo.readDiagnosticInfo();
  }
}
