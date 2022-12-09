export default class TelemetryDiagnosticControls {
    constructor(telemetryClient) {
        this.diagnosticChannelConnectionString = "*111#";
        this.telemetryClient = telemetryClient;
        this.diagnosticInfo = "";
    }
    readDiagnosticInfo() {
        return this.diagnosticInfo;
    }
    writeDiagnosticInfo(newValue) {
        this.diagnosticInfo = newValue;
    }
    checkTransmission() {
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
