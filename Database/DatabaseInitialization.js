import Connection from "./Connection/Connection.js";
import User from "./Models/User.js";
import ChargePart_Report from "./Models/ChargePart_Report.js";
import FaultCodeReport from "./Models/FaultCodeReport.js"
import MaintenceTable from "./Models/Maintence_Table.js"


const DatabaseInitializations = {
    Connection,
    User,
    ChargePart_Report,
    FaultCodeReport,
    MaintenceTable
} 
export default DatabaseInitializations;
