import ReactDOM from "react-dom/client";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import MaterialThemeProvider from "./providers/MuiProvider";
import Routing from "./Entry";
import "@fontsource/poppins";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css/navigation";
import "swiper/css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import CommonProvider from "./providers/CommonProvider";
import Modules from "./modules";
import { registerAuthServiceWorker } from "./modules/utils/registerAuthServiceWorker";
import "react-photo-album/masonry.css";

registerAuthServiceWorker();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter
      basename={process.env.NODE_ENV === "development" ? "" : "/support"}
    >
      <Suspense fallback={<div></div>}>
        <Modules>
          <MaterialThemeProvider>
            <CommonProvider>
              <Routing />
            </CommonProvider>
          </MaterialThemeProvider>
        </Modules>
      </Suspense>
    </BrowserRouter>
  </>
);
