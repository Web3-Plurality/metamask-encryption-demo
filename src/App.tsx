import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { WagmiProvider } from 'wagmi';
import { goerli, mainnet, optimism } from 'wagmi/chains';
import { metaMask, safe } from 'wagmi/connectors';
import { http, createConfig } from '@wagmi/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import EncrytiomDemo from './Pages/EncrytiomDemo';


const client = createConfig({
  chains: [goerli, mainnet, optimism],
  connectors: [
    metaMask({
      extensionOnly: true,
      injectProvider: true
    }),
    safe({
      shimDisconnect: true,
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http(),
    [optimism.id]: http(),
  },
});

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={client}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<EncrytiomDemo />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
