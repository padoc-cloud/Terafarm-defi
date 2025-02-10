// webrtc.ts 

export class WebRTCService {
    private peerConnection: RTCPeerConnection;
    private dataChannel: RTCDataChannel | null = null;
    private remoteStream: MediaStream | null = null;
    private messageCallback: ((message: string) => void) | null = null;

    constructor() {
        const config: RTCConfiguration = {
            iceServers: [
                {
                    urls: [
                        'stun:stun.l.google.com:19302'
                    ],
                }
            ]
        };

        if (typeof window != "undefined") {
            this.peerConnection = new RTCPeerConnection(config);
            this.peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    // Handle the ICE candidate (send it to the remote peer through your signaling mechanism)
                    console.log("New ICE candidate", event.candidate);
                }
            };
            this.dataChannel = this.peerConnection.createDataChannel("teraFarming");
            this.peerConnection.ondatachannel = (event) => {
                this.dataChannel = event.channel;
                this.dataChannel.onmessage = (e) => {
                    console.log("Message from peer:", e.data);
                };
            };

            this.peerConnection.onconnectionstatechange = (event) => {
                console.log(event);
                if (this.peerConnection.connectionState === "connected") {
                    console.log("succesfully connected with other peer");
                }
            };
    
            this.peerConnection.ontrack = (event) => {
                this.remoteStream = event.streams[0];
            };
        } else {
            console.error("Failed to create peer connection:");
            this.peerConnection = null as unknown as RTCPeerConnection;
        }
    }

    // Create a new data channel if you're initiating the connection
    public createDataChannel(label: string) {
        this.dataChannel = this.peerConnection.createDataChannel(label);
        this.setupDataChannel();
    }

    // Setup event handlers for data channel
    public setupDataChannel() {
        if (this.dataChannel) {
            this.dataChannel.onopen = () => console.log('Data channel is open');
            this.dataChannel.onclose = () => console.log('Data channel is closed');
            this.dataChannel.onmessage = (event) => {
                const message = event.data;
                console.log('Message received:', message);
                if (this.messageCallback) {
                    this.messageCallback(message);
                }
            };
        }
    }

    // Register a callback for incoming messages
    onMessage(callback: (message: string) => void) {
        this.messageCallback = callback;
    }

    // Create offer to initiate P2P connection
    async createOffer() {
        const offer = await this.peerConnection.createOffer({});
        await this.peerConnection.setLocalDescription(offer);
        return offer;
    }

    // Answer a P2P connection offer
    async handleOffer(offer: RTCSessionDescriptionInit) {
        await this.peerConnection.setRemoteDescription(offer);
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        return answer;
    }

    // Handle incoming answer to complete the connection
    async handleAnswer(answer: RTCSessionDescriptionInit) {
        await this.peerConnection.setRemoteDescription(answer);
    }

    // Add ICE candidates
    async addIceCandidate(candidate: RTCIceCandidateInit) {
        await this.peerConnection.addIceCandidate(candidate);
    }

    // Send a message over the data channel
    sendMessage(message: string) {
        if (this.dataChannel?.readyState === 'open') {
            this.dataChannel.send(message);
        } else {
            console.error('Data channel is not open');
        }
    }

    // Get remote stream for media (optional, if you're doing video/audio)
    getRemoteStream(): MediaStream | null {
        return this.remoteStream;
    }

    // Close the connection
    closeConnection() {
        this.peerConnection.close();
    }
}

export const webRTCTextService = new WebRTCService();