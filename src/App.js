import logo from './logo.svg';
import './App.css';


import React, {  useEffect } from "react";// useState,
import { withSnackbar, useSnackbar } from "notistack";
import Button from '@mui/material/Button';


import { Workbox } from "workbox-window";

function App() {

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
	useEffect(() => {
    if ("serviceWorker" in navigator) {

			const refreshAction = ({onAccept}) => { //render the snackbar buttons
				return (
					<>
						<Button
							className="snackbar-button"
							size="small"
							onClick={() => onAccept()}
						>
							{"Refresh"}
						</Button>
						<Button
							className="snackbar-button"
							size="small"
							onClick={() => closeSnackbar()}
						>
							{"Dismiss"}
						</Button>
					</>
				);
			};
			
      const wb = new Workbox("/service-worker.js");

      wb.addEventListener("installed", (event) => {
        if (!event.isUpdate) {
          // First-installed code goes here...
          console.log("New SW was installed!");
        } 
      });

      wb.addEventListener("waiting", (event) => {
        console.log(
          `A new service worker has installed, but it can't activate ` +
            `until all tabs running the current version have fully unloaded. `
        );

        if (event.isUpdate) {
						enqueueSnackbar("A new version was released!", {
							persist: true,
							variant: "warning",
							action: refreshAction({
								onAccept: () => {
									wb.messageSkipWaiting();
									window.location.reload();
								},
							}),
						});
        }
      });


      wb.register();

      const versionMessage = async () => {
        //return await wb.messageSW({ type: "GET_VERSION" });
				const swVersion = await wb.messageSW({type: "GET_VERSION"});
				console.log("Service Worker version:", swVersion);
      };

			versionMessage();
    }
		

  }, [enqueueSnackbar, closeSnackbar]);



  return ( 
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withSnackbar(App);  //uses the snackbar context