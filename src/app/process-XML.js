import fs from "node:fs";
import iconv from "iconv-lite";
import { parseStringPromise } from "xml2js";

const filePath =
  "/Library/FileMaker Server/Data/Documents/FM-XML2JS/xml/FM-XML2JS.xml";

const processXML = async () => {
  let parsingResult = "";
  let result = "";
  try {
    // Read the file as a buffer
    const fileBuffer = fs.readFileSync(filePath);
    // Convert from UTF-16LE to UTF-8
    const utf8String = iconv.decode(fileBuffer, "utf16");

    // //Parse the XML
    parsingResult = await parseStringPromise(utf8String);
    // this is just an example of what can be returned
    return parsingResult.FMSaveAsXML.Structure[0].AddAction;
  } catch (e) {
    console.log(e);
    parsingResult = e.message;
  }
};
export { processXML };
