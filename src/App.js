import React, { useState } from 'react';

const NFCReader = () => {
    const [nfcData, setNfcData] = useState('');

    const readNFC = async () => {
        // Tarayıcının NFC desteğini kontrol et
        if (!('NDEFReader' in window)) {
            alert('Bu tarayıcı NFC desteklemiyor.');
            return;
        }

        const ndef = new NDEFReader();
        try {
            await ndef.scan();
            console.log("NFC okutulmaya hazır...");

            // NFC tag okutulduğunda çalışacak fonksiyon
            ndef.onreading = (event) => {
                const message = event.message;
                let data = '';

                for (const record of message.records) {
                    const decoder = new TextDecoder(record.encoding);
                    data += decoder.decode(record.data);
                }

                setNfcData(data);
            };
        } catch (error) {
            console.error("NFC okutma hatası: ", error);
        }
    };

    return (
        <div>
            <h1>NFC Okuyucu</h1>
            <button onClick={readNFC}>NFC Tag Oku</button>
            {nfcData && <p>Okunan Veri: {nfcData}</p>}
        </div>
    );
};

export default NFCReader;
