import React, { useState } from 'react';

const NFCReader = () => {
    const [nfcData, setNfcData] = useState(null);
    const [error, setError] = useState(null);

    const readNFC = async () => {
        if ('NDEFReader' in window) {
            const ndef = new window.NDEFReader();
            try {
                await ndef.scan();
                console.log("NFC tarayıcı başlatıldı.");
                ndef.onreading = (event) => {
                    const message = event.message;
                    const records = Array.from(message.records);
                    setNfcData(records.map(record => new TextDecoder().decode(record.data)).join(', '));
                };
            } catch (err) {
                setError(`Hata: ${err}`);
            }
        } else {
            setError('Web NFC API tarayıcınızda desteklenmiyor.');
        }
    };

    return (
        <div>
            <h1>NFC Okuyucu</h1>
            <button onClick={readNFC}>NFC Oku</button>
            {nfcData && <div><h2>Okunan NFC Verisi:</h2><p>{nfcData}</p></div>}
            {error && <div style={{ color: 'red' }}><h2>Hata:</h2><p>{error}</p></div>}
        </div>
    );
};

export default NFCReader;
