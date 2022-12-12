import TelemetryClientI from "./models/TelemetryClient";

export default class TelemetryDiagnosticControls {
  private diagnosticChannelConnectionString: string;

  private telemetryClient: TelemetryClientI;
  private diagnosticInfo: string;

  constructor(telemetryClient: TelemetryClientI) {
    this.diagnosticChannelConnectionString = "*111#";
    this.telemetryClient = telemetryClient;
    this.diagnosticInfo = "";
  }

  public readDiagnosticInfo() {
    return this.diagnosticInfo;
  }

  public writeDiagnosticInfo(newValue: string) {
    this.diagnosticInfo = newValue;
  }

  public checkTransmission() {
    this.diagnosticInfo = "";

    this.telemetryClient.disconnect();

    let retryLeft = 3;
    while (this.telemetryClient.getOnlineStatus() === false && retryLeft > 0) {
      this.telemetryClient.connect(this.diagnosticChannelConnectionString);
      retryLeft -= 1;
    }

    if (this.telemetryClient.getOnlineStatus() === false) {
      throw new Error("Unable to connect");
    }

    this.telemetryClient.send(this.telemetryClient.diagnosticMessage());
    this.diagnosticInfo = this.telemetryClient.receive();
  }
}
