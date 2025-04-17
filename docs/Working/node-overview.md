Below is an overview of how the nebula node setup works.

- First the client generates a keypair (public and private key)
- The public key is sent to the backend server to be signed by the Certificate Authority (CA).
- The CA signs the public key and returns the signed certificate.
- Along with the signed certificate, the backend also returns the details of the Nebula Lighthouse and the ip-address that will be used by the client within the Nebula network.
- Using the above details, the client creates a nebula configuration file and starts the Nebula service on the device.

