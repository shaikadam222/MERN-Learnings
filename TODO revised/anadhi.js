let nfts = [];

function mintNFT(id,name,eyecolor, shirt_type, bling) {
    const nft = {
        id : id,
        name: name,
        eyecolor : eyecolor,
        shirt_type: shirt_type,
        bling: bling
    };

    nfts.push(nft);
}

function listNFTs() {
    for (let i = 0; i < nfts.length; i++) {
        console.log(`Name: ${nfts[i].name}`);
        console.log(`eyecolor: ${nfts[i].eyecolor}`);
        console.log(`shirt_type: ${nfts[i].shirt_type}`);
        console.log(`bling : ${nfts[i].bling}`);
    }
}

function getTotalSupply() {
    return nfts.length;
}

mintNFT("bob","blue","hoodie","goldchain");

listNFTs();
console.log(`Total Supply: ${getTotalSupply()}`);
