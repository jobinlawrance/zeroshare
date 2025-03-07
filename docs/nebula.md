
A Nebula Lighthouse is a central discovery service that helps Nebula nodes find each other in a mesh network. Think of it as a meeting point where nodes can discover their peers' locations. It serves two critical functions:

1. **Discovery Service**: Acts as a rendezvous point for nodes to find each other's current IP addresses
2. **NAT Traversal**: Helps nodes establish direct peer-to-peer connections, even when they're behind NATs

#### Certificate Authority (CA) and Security

Nebula uses a Public Key Infrastructure (PKI) system where:
- The Lighthouse generates and manages a Certificate Authority (CA)
- Each node (client) needs a signed certificate from this CA to join the network
- Certificates contain information about:
  - Node identity
  - IP address within the mesh network
  - Groups the node belongs to
  - Valid time period

This ensures that only authorized nodes can join your mesh network, providing a secure P2P communication channel.

#### How P2P Communication Works

1. Node A wants to communicate with Node B
2. Node A asks the Lighthouse for Node B's current location
3. The Lighthouse provides Node B's public address
4. Nodes A and B establish a direct, encrypted connection
5. Future communication happens directly between nodes, not through the Lighthouse

#### Nebula Mesh P2P Architecture

Nebula's mesh network operates on these key principles:

 **Overlay Network**:

   - Creates a virtual network overlay on top of existing networks
   - Each node gets a unique IP in the 10.0.0.0/8 or similar private range
   - Traffic between nodes is encrypted using NaCl's Curve25519

 **Direct Connections**:

   - Once nodes discover each other, they communicate directly (true P2P)
   - No traffic routing through central servers
   - Supports UDP hole punching for NAT traversal

 **Dynamic Routing**:

   - Automatically finds the best path between nodes
   - Handles network changes and node failures gracefully
   - Supports multi-path routing for redundancy

 **Security Features**:

   - End-to-end encryption for all traffic
   - Perfect forward secrecy
   - Groups-based access control
   - Certificate-based authentication

For detailed information about Nebula's architecture and configuration, refer to the [official Nebula documentation](https://nebula.defined.net/docs/).

#### P2P File Transfer Benefits

P2P mesh networking is particularly advantageous for file transfers because:

1. **Direct Transfer Efficiency**:
   - Files transfer directly between peers without going through a central server
   - Eliminates double bandwidth usage (upload to server, then download to recipient)
   - Significantly faster for large files due to direct connection
   - Reduces central server storage and bandwidth costs

2. **Scalability**:
   - Network capacity grows with each new peer
   - Distributed load across the network
   - No central bottleneck for large file transfers

#### Fallback Mechanisms

Nebula implements a robust fallback system when direct P2P connections aren't possible:

1. **Nebula's Relay Approach**:
   - If direct UDP hole punching fails, traffic routes through the Lighthouse
   - Maintains encryption and security while sacrificing some speed
   - Automatically switches back to direct connection when possible

2. **ZeroShare's Application-Level Fallback**:
   - Detects if client supports incoming connections
   - If P2P isn't possible, switches to chunk-based transfer through backend server
   - Files are split into manageable chunks
   - Each chunk is routed through the host machine running the backend
   - Ensures reliable transfer even in restrictive network environments

This dual-layer fallback system (Nebula + Application) ensures reliable file transfer regardless of network conditions or client capabilities.