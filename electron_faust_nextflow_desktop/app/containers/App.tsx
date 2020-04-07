import React, { ReactNode } from 'react';

import { RManager, RManagerProvider } from '../components/r_manager';
import { ShinyManager, ShinyManagerProvider } from '../components/shiny_manager';

// export default function App(props: Props) {
//     const { children } = props;
//     return (
//         <>
//             <RManagerProvider>
//                 <ShinyManagerProvider>
//                     <RManager />
//                     <ShinyManager />
//                     {children}
//                 </ShinyManagerProvider>
//             </RManagerProvider>
//         </>
//     );
// }

type Props = {
    children: ReactNode;
};
export default function App(props: Props) {
    const { children } = props;
    return <>{children}</>;
}
