import * as XLSX from "xlsx";

/**
 * Normalize tick values coming from Wingdings
 */
const normalizeTick = (val) => {
    if (val === null || val === undefined) return null;

    let str = String(val).trim();

    // Normalize case
    const lower = str.toLowerCase();

    // ✅ TRUE / TICK values
    const TRUE_VALUES = new Set([
        // Wingdings / weird encodings
        "ü", "û", "þ", "ý", "",

        // Unicode ticks
        "✔", "✓", "☑", "🗸", "✅",

        // Text
        "yes", "y", "true", "done", "ok", "checked",

        // Numbers
        "1",
    ]);

    // ❌ FALSE / CROSS values
    const FALSE_VALUES = new Set([
        // Unicode cross
        "✘", "✖", "✕", "❌",

        // Text
        "no", "n", "false", "not done", "pending",

        // Numbers
        "0",
    ]);

    if (TRUE_VALUES.has(str) || TRUE_VALUES.has(lower)) return true;
    if (FALSE_VALUES.has(str) || FALSE_VALUES.has(lower)) return false;

    // ⚠️ Partial matches (extra safety)
    if (lower.includes("yes") || lower.includes("true")) return true;
    if (lower.includes("no") || lower.includes("false")) return false;

    // fallback (return original or null)
    return null;
};

export const parseExcelFile = async (file) => {
    if (!file) throw new Error("No file provided");

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: null,
    });

    return transformExcelData(rows);
};

const transformExcelData = (rows) => {
    const dataRows = rows.slice(2);

    return dataRows
        .filter((row) => row && row.length && row[1])
        .map((row) => {
            return {
                srNo: row[0] ?? null,
                module: row[1] ?? null,
                section: row[2] ?? null,

                screenshot: normalizeTick(row[3]),

                script: {
                    hindi: normalizeTick(row[4]),
                    english: normalizeTick(row[5]),
                },

                audio: {
                    hindi: normalizeTick(row[7]),
                    english: normalizeTick(row[8]),
                },

                recording: {
                    hindi: normalizeTick(row[10]),
                    english: normalizeTick(row[11]),
                },

                finalVideo: {
                    hindi: normalizeTick(row[13]),
                    english: normalizeTick(row[14]),
                },

                youtube: {
                    english: row[15] ?? null,
                    hindi: row[16] ?? null,
                },

                createdBy: row[17] ?? null,
            };
        });
};