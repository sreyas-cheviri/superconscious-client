import { CircleX } from "lucide-react";
import { Button } from "./Button";
import { Chips } from "./Chips";
import { Input } from "./Input";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}
const API_URL = import.meta.env.VITE_API_URL;

enum ContentType {
  Url = "Url",
  Note = "Note",
  Doc = "Doc",
  Image = "Image"
}

export function Modal({ open, onClose }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [open]);


  const titleRef = useRef<HTMLInputElement | null>(null);
  const LinkRef = useRef<HTMLInputElement | null>(null);
  const NoteRef = useRef<HTMLTextAreaElement | null>(null);
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const handleChipClick = (chip: string) => {
    const newSelectedChip = selectedChip === chip ? null : chip;
    setSelectedChip(newSelectedChip);

  };
  const [type, setType] = useState(ContentType.Url)
  async function addContent(){
    const title  = titleRef.current?.value;
    const link  = LinkRef.current?.value;
    const content  = NoteRef.current?.value;
    console.log(type);
    
    await axios.post(`${API_URL}/api/v1/content`,{
    title,link,type,content
    },{
      headers:{
        "Authorization" : localStorage.getItem("token")
      }
    }).then(() => {onClose();
    window.location.reload()})

    
  }

  return (
    open && (
      <div
        className="w-screen h-screen bg-black/80 fixed top-0 left-0 z-40 flex justify-center items-center"
        onClick={onClose} // Clicking outside closes the modal
      >
        <div
          className="bg-zinc-100 text-black rounded-2xl max-w-[90%] max-h-[65%] z-50 md:w-[44rem] md:h-[40rem] w-full h-full"
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing the modal
        >
          <div className="bg-zinc-400/60 p-5 w-full h-full rounded-2xl">
            <div className="flex items-center justify-between w-full text-gray-700">
              <div className="flex-grow flex justify-center">
                <p className="font-bold text-lg">Add your content</p>
              </div>
              <CircleX
                onClick={onClose}
                className="cursor-pointer hover:text-zinc-500"
              />
            </div>

            <div className="flex justify-center text-xs text-gray-600 items-center font-semibold">
              <p className="flex justify-center items-center w-96 text-center">
                Choose an option to get started: Notes, Doc, Image, or URL.
                Select the type of content you want to add!
              </p>
            </div>

            <div className="flex flex-col h-full gap-2">
              <div className="flex gap-1 mt-10 m-2">
                <div className="flex gap-2 mt-2 bg-black/15 p-1 rounded-full">
                  {["Url", "Note", "Doc", "Image"].map((chip, index) => (
                    <Chips key={index} text={chip} isSelected={selectedChip === chip} onClick={()=>{
                      setType(ContentType[chip as keyof typeof ContentType]);
                      handleChipClick(chip);
                    } } />
                  ))}
                </div>
              </div>
              <div className="flex gap-2  flex-col">
                <Input placeholder="Title" reference={titleRef}  variant={"secondary"} />
                {type === ContentType.Url ? (
                  <Input placeholder="Url/link" reference={LinkRef} variant={"secondary"} />
                ) : (
                  <textarea  placeholder="Your text.........." ref={NoteRef} className="p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 border-gray-300 max-h-fit bg-gray-50 border-2 " />
                )}
              </div>
              <div className="mb-6 flex items-end justify-end">
                <Button onClick={addContent} variant="round" size="md">
                  Add to Memory
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
