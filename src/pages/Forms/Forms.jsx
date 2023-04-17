import { useState } from "react";

//Importing global user interface components 
import PageBase from "../../ui/PageBase/PageBase";

import ect_file from "./assets/estimate_closing_template.pdf";
import mr_file from "./assets/maintenance_request.pdf";
import pa_file from "./assets/purchase_agreement.pdf";

//Importing page specific components
import Card from "./components/Card";
import SideBarMenu from "./components/SideBarMenu"; 
import EstimatedClosingCard from "./components/EstimatedClosingCard";
import InitialDocumentCard from "./components/InitialDocumentCard";
import SalesContractCard from "./components/SalesContractCard";
import RepairsRequestCard from "./components/RepairsRequestCard";
import { Button } from "@mui/material";

//Importing page specific CSS
import classes from "./Forms.module.css";
//{InitialDocument && <InitialDocument />} 

function Forms() {

    const [InitialDocument, setInitialDocument] = useState(true);
    const [EstimatedClosing, setEstimatedClosing] = useState(false);
    const [SalesContract, setSalesContract] = useState(false);
    const [RepairsRequest, setRepairsRequest] = useState(false);
    const [DownloadPath, setDownload] = useState(undefined);

    function chooseECC() {
        setSalesContract(false);
        setInitialDocument(false);
        setRepairsRequest(false);
        setEstimatedClosing(true);
        setDownload(ect_file);
    }

    function chooseSC() {
        setSalesContract(true);
        setInitialDocument(false);
        setRepairsRequest(false);
        setEstimatedClosing(false);
        setDownload(pa_file);
    }

    function chooseRR() {
        setSalesContract(false);
        setInitialDocument(false);
        setRepairsRequest(true);
        setEstimatedClosing(false);
        setDownload(mr_file);
    }

    return (
        <div className={classes.content}>
            

                <div className={classes.header}>
                <h1>Forms</h1>
            </div>

                <div className={classes.content}>
                    <div className={classes.row}>
                        <div className={classes.left}>
                            <Card>
                                {EstimatedClosing && <EstimatedClosingCard />}
                                {InitialDocument && <InitialDocumentCard />}
                                {SalesContract && <SalesContractCard />}
                                {RepairsRequest && <RepairsRequestCard />}
                            </Card>
                        </div>
                        <div className={classes.right}>
                        <SideBarMenu ECC={chooseECC} SC={chooseSC} RR={chooseRR} />

                        <Button
                            sx={{ width: "100%"}}
                            variant="contained"
                            onClick = {() => {
                                window.open(DownloadPath);
                            }}
                            disabled = {DownloadPath == undefined}
                        >
                            Download
                        </Button>

                        </div>
                    </div>
                </div>
            
        </div>
    );
};

export default Forms;