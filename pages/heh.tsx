
import { FC, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

import { CreateTokenButton } from "../utils/CreateTokenButton";
import { MetaplexFileTag, toMetaplexFileFromBrowser } from "@metaplex-foundation/js";
import dynamic from 'next/dynamic';
import Image from "next/image";
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { PublicKey } from '@solana/web3.js';

import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const WalletModalProvider = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletModalProvider), { ssr: false });

const WalletMultiButton = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), { ssr: false });
const walletPublicKey = "";

const Heh: FC = ({ }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [walletToParsePublicKey, setWalletToParsePublicKey] =
    useState<string>(walletPublicKey);
  const { publicKey } = useWallet();

  const onUseWalletClick = () => {
    if (publicKey) {
      setWalletToParsePublicKey(publicKey?.toBase58());
    }
  };

  const [quantity, setQuantity] = useState(0);
  const [decimals, setDecimals] = useState(9);
  const [wltAdr, setWltAdr] = useState("")
  const [tokenName, setTokenName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [metadataURL, setMetadataURL] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [metadataMethod, setMetadataMethod] = useState('url')
  const [tokenDescription, setTokenDescription] = useState('')
  const [file, setFile] = useState<Readonly<{
    buffer: Buffer;
    fileName: string;
    displayName: string;
    uniqueName: string;
    contentType: string | null;
    extension: string | null;
    tags: MetaplexFileTag[];
  }>>()
  const [fileName, setFileName] = useState('')

  const handleFileChange = async (event: any) => {
    const browserFile = event.target.files[0];
    const _file = await toMetaplexFileFromBrowser(browserFile);
    setFile(_file);
    setFileName(_file.fileName)
  }
  console.log(file?.buffer)
  const base64Image: string = Buffer.from(file?.buffer ?? "").toString('base64')
  console.log(`data:image/jpeg;base64,${base64Image}`)
  return (
    <div className="container text-white mx-auto max-w-6xl p-8 2xl:px-0 ">
      <div className="">
        <Menubar className="h-[50px] bg-transparent ">
          <MenubarMenu>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Mainnet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Mainnet</SelectItem>
                <SelectItem value="dark">Devnet</SelectItem>
              </SelectContent>
            </Select>
            <WalletModalProvider>
              <WalletMultiButton />
            </WalletModalProvider>
          </MenubarMenu>
        </Menubar>

      </div>
      <div>
      </div>
      <div className="text-center pt-2 text-gray-200 ">
        <div className="hero min-h-16 p-0 pt-10 ">
          <div className=" ">
            <div className="w-full">
              <h1 className="mb-5 text-5xl text-sky-400">
                Create Solana  token
              </h1>

              <div className="md:w-[600px] mx-auto">
                <div className="md:w-[480px] flex flex-col m-auto">


                  <label className="flex text-white ">Token Name</label>

                  <Input type="text" onChange={(e) => setTokenName(e.target.value)} placeholder="Enter the name of token you want to mint" className="flex h-10 w-full rounded-md  px-3 py-2 text-sm  bg-black text-white mt-2  " />

                  <label className=" flex pt-2 ">Symbol</label>

                  <Input type="text" placeholder="Enter desired Symbol" onChange={(e) => setSymbol(e.target.value)} className="flex h-10 w-full rounded-md  px-3 py-2 text-sm  bg-black text-white mt-2  " />
                  <label className=" flex pt-2">Number of tokens to mint</label>



                  <Input type="number" min="0" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} placeholder="Enter the number of tokens you want to mint" className="flex h-10 w-full rounded-md  px-3 py-2 text-sm  bg-black text-white mt-2  " />

                  <label className=" flex pt-2">Number of decimals</label>

                  <Input type="number" min="0" value={decimals} onChange={(e) => setDecimals(parseInt(e.target.value))} placeholder="Enter the number of decimals" className="flex h-10 w-full rounded-md  px-3 py-2 text-sm  bg-black text-white mt-2  " />


                  <div className="mt-5 mb-2   flex  text-2xl">Meta data</div>
                  <Tabs defaultValue="account" className=" ">
                    <TabsList>
                      <TabsTrigger value="account">Use Existing Metadata URL</TabsTrigger>
                      <TabsTrigger value="password">Create Metadata</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" onClick={() => { setMetadataMethod('url'), setTokenDescription('') }}>
                      <label className=" mt-2 flex">Metadata URL</label>

                      <Input type="text" onChange={(e) => setMetadataURL(e.target.value)} placeholder="Enter the metadata URL" className="flex h-10 w-full rounded-md  px-3 py-2 text-sm  bg-black text-white mt-2  " />

                    </TabsContent>
                    <TabsContent value="password" onClick={() => { setMetadataMethod('upload'), setMetadataURL(''), setFile(undefined), setFileName('') }}>
                      <label className="  flex">Description</label>


                      <Input type="text" onChange={(e) => setTokenDescription(e.target.value)} placeholder="Enter the description of the token" className="flex h-10 w-full rounded-md  px-3 py-2 text-sm  bg-black text-white mt-2  " />

                      <div>

                        <label className=" mt-2 flex ">Image</label>
                        <div className="FLEX">
                          <label htmlFor="file" className=" text-slate-50  bg-slate-900/90 p-2 rounded dark:bg-slate-50 hover:bg-black  dark:text-slate-900 "
                          >
                            Upload image
                          </label>
                        </div>
                        <input
                          id="file"
                          type="file"
                          name="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{ display: 'none' }} />
                      </div>
                      <div className="flex items-center border rounded-md p-2 mt-4">
                        <div className="flex items-center">
                          <Image
                            src={`data:image/jpeg;base64,${base64Image}`}
                            className="rounded-full h-10 w-10"
                            alt=""
                            width={50}
                            height={50}
                          />
                          <div className="ml-2">
                            <p className="mb-1">{tokenName}</p>
                            <p className="">{symbol}</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  <div className="mt-5 mb-2  flex ">Authority</div>
                  <div className="flex justify-center mb-4 ">

                    <Label className="text-lg" htmlFor="">Enable Freeze authority</Label>
                    <input className=" mx-2 mt-2"
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(!isChecked)}
                    />
                  </div>
                </div>
                <CreateTokenButton connection={connection} publicKey={publicKey} wallet={wallet} quantity={quantity} decimals={decimals} isChecked={isChecked} tokenName={tokenName} symbol={symbol} metadataURL={metadataURL} description={tokenDescription} file={file} metadataMethod={metadataMethod} wltAdr={wltAdr} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );

};

export default Heh
