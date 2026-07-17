import { useState } from "react";
import { parseExcelFile } from "../../utils/parseExcel";

export default function ParseExcelPage() {
    const [data, setData] = useState([]);

    const handleFile = async (e) => {
        const file = e.target.files[0];

        try {
            const parsed = await parseExcelFile(file);
            await saveToFile(parsed);
            setData(parsed);
        } catch (err) {
            console.error(err);
        }
    };

    const saveToFile = async (data) => {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: "output.json",
                types: [
                    {
                        description: "JSON File",
                        accept: { "application/json": [".json"] },
                    },
                ],
            });

            const writable = await handle.createWritable();
            await writable.write(JSON.stringify(data, null, 2));
            await writable.close();

            alert("File saved successfully!");
        } catch (err) {
            console.error("Save cancelled or failed", err);
        }
    };
    return (
        <div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFile} />

            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}