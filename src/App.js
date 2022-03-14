import logo from './logo.svg';
import './App.css';


import React, {  useEffect } from "react";// useState,
//default imports...
import { withSnackbar, useSnackbar } from "notistack";
//import * as serviceWorker from "./serviceWorker";
//import { Button } from "@material-ui/core";
import Button from '@mui/material/Button';


import { Workbox } from "workbox-window";

function App() {

	const { enqueueSnackbar, closeSnackbar } = useSnackbar(); //, closeSnackbar

	/* const [state, setState] = useState({
		newVersionAvailable: false,
		wb: {},
	}) */

	/* const onServiceWorkerUpdate = (wb) => {
		console.log(wb);
    setState({
      //waitingWorker: wb && wb.waiting,
			worker: wb,
      newVersionAvailable: true,
    });
  }; */

  

  

	useEffect(() => {
    if ("serviceWorker" in navigator) {

			/* const updateServiceWorker = () => {
				const { wb } = state;
				
				console.log("updateServiceWorker()");
				console.log(wb);
		
				wb && wb.messageSkipWaiting();
				//waitingWorker.messageSkipWaiting();
		
				
				setState({ newVersionAvailable: false });
				//window.location.reload();
			}; */

			const refreshAction = ({onAccept}) => { //render the snackbar button
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
          /* if (confirm(`A newer version is available! Click OK to refresh.`)) {
            wb.messageSkipWaiting();
            window.location.reload();
          } */
        } else {
          console.log("There is a new version of sw!");
        }
      });

      wb.addEventListener("waiting", (event) => {
        console.log(
          `A new service worker has installed, but it can't activate ` +
            `until all tabs running the current version have fully unloaded. `
        );
        //console.log(event);

        if (event.isUpdate) {
          //setRefreshAlert(true);
            console.log("eventListener, event.isUpdate = true");

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

						//console.log(wb);
						//onServiceWorkerUpdate(wb);
            // wb.messageSkipWaiting();
            // window.location.reload();
            // setRefreshResponse(false);
            // setRefreshAlert(false);
        }
      });

			// console.log(wb.isUpdate);
			// wb.isUpdate && wb.update(console.log("wb.update"));

      wb.register(); //{ onUpdate: onServiceWorkerUpdate }, console.log("Registered")

			//wb.update(onServiceWorkerUpdate(wb));
			//wb.update(console.log(wb));

			/* if (state.newVersionAvailable) //show snackbar with refresh button
      enqueueSnackbar("A new version was released", {
        persist: true,
        variant: "success",
        action: refreshAction(),
      }); */

      const versionMessage = async () => {
        //return await wb.messageSW({ type: "GET_VERSION" });
				const swVersion = await wb.messageSW({type: "GET_VERSION"});
				console.log("Service Worker version:", swVersion);
      };

			versionMessage();
    /*   try {
        af().then((resp) => console.log("Service Worker version:", resp));
        //
      } catch (e) {
        console.log(e);
      } */
    }
		

  }, [enqueueSnackbar]); // , []



  return ( //render components
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




/* class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newVersionAvailable: false,
      waitingWorker: {},
    };
  } */

/*   componentDidMount = () => {
    const { enqueueSnackbar } = this.props;
    const { newVersionAvailable } = this.state;
		if (process.env.NODE_ENV === 'production') {
    	serviceWorker.register({ onUpdate: this.onServiceWorkerUpdate });
		}

    if (newVersionAvailable) //show snackbar with refresh button
      enqueueSnackbar("A new version was released", {
        persist: true,
        variant: "success",
        action: this.refreshAction(),
      });
  }; */
