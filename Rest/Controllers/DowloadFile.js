import fs from "fs";
import path from "path";


const processData = (req, res) => {
  const receivedData = req.body;

  console.log("Gelen veri:", receivedData);

  const folderPath = path.join(process.cwd(), "data");
  const filePath = path.join(folderPath, "Data.json");

  fs.readFile(filePath, "utf8", (readErr, existingData) => {
    let newData = {};

    if (readErr) {
      newData = receivedData;
    } else {
      try {
        const parsedData = JSON.parse(existingData);
        newData = { ...parsedData, ...receivedData };
      } catch (parseErr) {
        console.error("Dosya içeriği geçersiz JSON formatında:", parseErr);
        res.status(500).send("Geçersiz JSON formatı");
        return;
      }
    }

    const updatedContent = JSON.stringify(newData, null, 2);

    fs.writeFile(filePath, updatedContent, "utf8", (writeErr) => {
      if (writeErr) {
        console.error("Dosyaya yazılırken bir hata oluştu:", writeErr);
        res.status(500).send("Dosyaya yazma hatası");
      } else {
        res.send("Veri işlendi ve dosyaya eklendi.");
      }
    });
  });
};

//Data Front a gönderilir
const getData = (req, res) => {
  const folderPath = path.join(process.cwd(), "data");
  const filePath = path.join(folderPath, "Data.json");

  fs.readFile(filePath, "utf8", (readErr, fileContent) => {
    if (readErr) {
      console.error("hata oluştu:", readErr);
      res.status(500).send("Dosya okuma hatası");
    } else {
      try {
        const jsonData = JSON.parse(fileContent);
        res.json(jsonData);
      } catch (parseErr) {
        res.status(500).send("Geçersiz JSON formatı");
      }
    }
  });
};

export { processData, getData };
