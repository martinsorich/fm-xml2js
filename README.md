## Description

This app converts FileMaker Pro script-generated XML files into JavaScript Objects using the popular [XML2JS](https://www.npmjs.com/package/xml2js) package.

## Ambition

FileMaker Pro XML files represent modeled instances of the binary file itself. XML files contain important architectural metadata about the FileMaker file, such as schema(tables, fields, relationships), logic (calculations and scripts), and UI (layout objects). This metadata can be mined for information and reporting.

## Set Up

- Host the `FM-XML2JS.fmp12` on a newer version (≥ v18) of FileMaker Server
- Make sure the `FileMaker Data API` is enabled on the server

## How Does the App Work?

In the command line run `npm start`

- A FM DAPI request runs a `Perform Script On Server` script in the `FM-XML2JS.fmp12` file, which includes a script step `Save a Copy as XML`, exporting an XML file copy of the FileMaker Pro file to a file path within the script.
- The path is specified within the file but can be specified in a script parameter as well.
- The script result is returned in the FM DAPI response returning any errors.
- The XML is then read using the path defined above and converted to a JavaScript object using the `iconv-lite` and `XML2JS` packages.

## Why is this Important?

JavaScript objects are easier to work with than XML.

## Discoveries

Because the XML file needs to be saved on the FileMaker Server environment, the `Save a Copy as XML` script step must be included within a script that is run as a `Perform Script on Server` script step. This allows the script to save to a designated server file path `/FileMaker Server/Data/Documents`.

The XML file output, from the FMP file, is saved in a `UTF-16` format. The UTF-16 BOM that prefixes the contents of the file needs to be removed and this is where `iconv-lite` comes into play, allowing it to work with the `XML2JS` library.
