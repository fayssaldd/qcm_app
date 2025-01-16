import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExamsApi from "../../services/ExamsApi";
import { ImageDown, Loader, LoaderCircle, PlusCircle, Printer, ThumbsDown, ThumbsUp, Trash } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QuestionApi from "../../services/QuestionApi";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch"

export default function ExamProf() {
    const { id: examId } = useParams();
    const [exam, setExam] = useState(null);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(true);
    const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
    const [isCreatingAnswer, setIsCreatingAnswer] = useState(null);
    const [ischekd, setIsChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const getData = () => {
        ExamsApi.getExamsForProf(examId)
            .then((response) => {
                setExam(response.data[0]);
                setIsChecked(response.data[0].isShow)
                setLoading(false);
                setIsCreatingAnswer(null); 
            })
            .catch((error) => {
                console.error("Error loading exam:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getData();
    }, [examId]);

    const handleAddQuestion = async (e) => {
        e.preventDefault()
        if (question.trim() !== "") {
            setIsCreatingQuestion(true);
            const formData = new FormData();
            formData.append("question", question);
            if (image) {
                formData.append("image_url", image);
            }
            
            try {
                await QuestionApi.ajouterQuestion(examId, formData);
                getData();
                setQuestion("");
                setImage(null)
                setPreview(null)
                toast("Quesiton selected well delete", {
                    className: "!bg-blue-500 !text-white",
                    description: (
                        <span className="text-white">Deleted successfuly</span>
                    ),
                });
            } catch (err) {

                console.error("reeee" + err);
            } finally {
                setIsCreatingQuestion(false);
            }
        } else {
            alert("The question field is required!");
        }
    };

    const handleAnswerInputChange = (questionId, value) => {
        setExam((prevExam) => ({
            ...prevExam,
            questions: prevExam.questions.map((q) =>
                q.id === questionId ? { ...q, answer: value } : q
            ),
        }));
    };

    const handleAddAnswer = async (questionId, isCorrect) => {
        const question = exam.questions.find((q) => q.id === questionId);
        if (question?.answer) {
            setIsCreatingAnswer(questionId); // Set loading for the specific question
            try {
                await QuestionApi.ajouterAnsewer(questionId, {
                    answer: question.answer,
                    is_correct: isCorrect ? 1 : 0,
                });
                getData(); // Refresh the data after adding the answer
            } catch (err) {
                console.error(err);
                setIsCreatingAnswer(null); 
            } 
            // finally {
            //     setIsCreatingAnswer(null); // Reset loading state
            // }
        } else {
            alert("Answer cannot be empty!");
        }
    };
    const deleteQuestion = (id)=>{
        if(confirm("Are you sur")){
            const deletingLoader = toast.loading("Deletion progress...");
              QuestionApi.deleteQuestion(id).then(res=>{
                getData()
                toast("Quesiton selected well delete", {
                  className: "!bg-red-500 !text-white",
                  description: (
                      <span className="text-white">Deleted successfuly</span>
                  ),
                });
                toast.dismiss(deletingLoader);   
                
        }).catch(err=>{
          console.log(err);
         
        })
        }
    }

    const handleChangeChecked = async (isShow)=>{
        setIsLoading(true)
        await ExamsApi.setIsShow(examId,{isShow})
            .then((res)=>{
                setIsChecked(!ischekd)
                setIsLoading(false)
            }).catch(err=>{
                console.log(err);
                setIsLoading(false)
                
            })
    }
    const handleChangeImage = (e)=>{
        const file = e.target.files[0];
        if (file) {
          setImage(file);
          const previewUrl = URL.createObjectURL(file);
          setPreview(previewUrl);
        }
    }

    const printPdf = async (id)=>{
        const deletingLoader = toast.loading("download en progress..");
        await ExamsApi.getExamPdf(id).then((response)=>{
          toast.dismiss(deletingLoader);                
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${exam.title}.pdf`);
          document.body.appendChild(link);
          link.click();
        }).catch(err=>{
          console.log(err);
          
        })
    }

    return (
        <>
            {loading ? (
                <p className="flex justify-center items-center w-full h-[80vh]">
                    <LoaderCircle className="animate-spin" />
                </p>
            ) : (
                <div className="flex flex-col w-full flex-wrap items-center justify-center">
                    <div className="w-full mt-4 text-center p-4 shadow border rounded">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-lg font-bold">{exam.title}</h1>
                                <p className="text-gray-500 text-xs">{exam.description}</p>
                            </div>
                            <div>
                            <span onClick={()=>printPdf(exam.id)} className="text-green-500 cursor-pointer">
                                <Printer />
                            </span>
                            </div>
                            <div className="flex items-center">

                                <span className="mr-2">Activez l'exam </span>
                                <Switch
                                    checked={ischekd}
                                    onCheckedChange={(e)=>handleChangeChecked(e)}
                                />
                                {isLoading && <Loader className={"animate-spin"} />}   
                            </div>
                        </div>
                        <div className="border-t p-4 mt-5">
                        <form
                            onSubmit={handleAddQuestion}
                            className="flex flex-col sm:flex-row items-center mt-4 gap-4"
                        >
                            <Input
                                className="flex-1"
                                value={question}
                                placeholder="Entrez une question"
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                            <label htmlFor="file-input" className="cursor-pointer text-primary">
                                <ImageDown />
                            </label>
                            <Input
                                type="file"
                                id="file-input"
                                className="hidden"
                                accept="image/*"
                                onChange={handleChangeImage}
                            />
                            {preview && (
                                <div className="mt-2">
                                    <img
                                        src={preview}
                                        alt="Aperçu"
                                        className="max-w-full max-h-[200px] border rounded-md"
                                    />
                                </div>
                            )}
                            <Button type="submit" disabled={isCreatingQuestion}>
                                {isCreatingQuestion ? (
                                    <Loader className="animate-spin" />
                                ) : (
                                    <PlusCircle />
                                )}
                            </Button>
                        </form>
                        </div>
                    </div>

                    <div className="w-full shadow p-4 mt-4 border rounded">
                        {exam.questions.map((q) => (
                            <div className="flex w-full items-center ">
                            <Accordion className="w-[90%]" key={q.id} type="single" collapsible>
                                <AccordionItem value={`item-${q.id}`}>
                                    <AccordionTrigger>
                                        <div className="flex">
                                        {q.question} 
                                        {q.image_url && <>
                                            <img className="w-[50px] ml-4" src={import.meta.env.VITE_BACKEND_URL + `/storage/${q.image_url}`} alt="" />

                                        </>}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex items-center max-md:flex-col max-md:justify-center justify-between border-t border-b p-4 mt-5">
                                            <div className="w-3/4 max-md:w-full flex items-center">
                                                <Input
                                                    value={q.answer || ""}
                                                    onChange={(e) =>
                                                        handleAnswerInputChange(q.id, e.target.value)
                                                    }
                                                />

                                            </div>
                                            <div className="w-1/4 max-md:w-full flex justify-center max-md:mt-4 ">
                                                    {isCreatingAnswer === q.id ? (
                                                        <Loader className="mx-2 my-2 animate-spin" /> ):<>
                                                    
                                                <span
                                                    className="ml-2 text-red-500 border rounded-full border-red-500 p-3 hover:bg-red-500 hover:text-white cursor-pointer"
                                                    onClick={() =>
                                                        handleAddAnswer(q.id, false) // Dislike
                                                    }
                                                >
                                                    <ThumbsDown />
                                                </span>
                                                <span
                                                    className="ml-2 text-green-500 border border-green-500 rounded-full p-3 hover:bg-green-500 hover:text-white cursor-pointer"
                                                    onClick={() =>
                                                        handleAddAnswer(q.id, true) // Like
                                                    }
                                                >
                                                    <ThumbsUp />
                                                </span>

                                                <span className='ml-2 text-red-500 border border-red-500 rounded-full p-3 hover:bg-red-500 hover:text-white cursor-pointer' onClick={()=>deleteQuestion(q.id)}>
                                                    <Trash/> 
                                                </span>
                                                </>}
                                            
                                                {/* <Button
                                                    onClick={() => handleAddAnswer(q.id, true)}
                                                    disabled={isCreatingAnswer === q.id}
                                                >
                                                    {isCreatingAnswer === q.id ? (
                                                        <Loader className="mx-2 my-2 animate-spin" />
                                                    ) : (
                                                        <PlusCircle />
                                                    )}
                                                </Button> */}
                                            </div>
                                        </div>
                                    </AccordionContent>
                                    {q.answers.map((ans) => (
                                        <AccordionContent key={ans.id}>
                                            <div
                                                className={`${
                                                    ans.is_correct ? "text-green-500" : ""
                                                }`}
                                            >
                                                {ans.answer}
                                            </div>
                                        </AccordionContent>
                                    ))}
                                </AccordionItem>
                            </Accordion>

                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
