"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  DotsThree,
  PaperPlaneRight,
  Paperclip,
  DownloadSimple,
  DotsThreeVertical,
  Eye,
  XCircle
} from "@phosphor-icons/react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  CONVERSATIONS,
  MESSAGES,
  GET_REPORTS_AND_FILES,
} from "@/graphql/queries";
import { CONVERSATE } from "@/graphql/mutations";
import { NEW_MESSAGE } from "@/graphql/subscriptions";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import {uploadFile} from "./fragments/extra"
import { useRouter } from "next/navigation";
import { truncateStr } from "@/utils";
import { twMerge } from "tailwind-merge";

const FileReport = ({ item }: any) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  return (
    <div className="flex justify-between">
      <div className="flex gap-x-2">
        <span className="w-[40px] h-[40px] bg-[#FEE4E2] rounded-full flex justify-center items-center">
          <Image src="/filepdf.svg" alt="pdf" height={23} width={20} />
        </span>
        <div>
          <p className="text-[14px] leading-[17px] text-[#04050F]">
            {truncateStr(item?.name, 20) || `Income statement.pdf`}
          </p>
          <p className="text-[12px] leading-[14px]">102 KB</p>
        </div>
      </div>
      <span className="relative">
        <DotsThreeVertical
          className="cursor-pointer"
          size={32}
          onClick={() => setShowDropdown(!showDropdown)}
        />
        {showDropdown && (
          <div className="absolute p-3 z-50 bg-white border-[1px] border-[#E6E6E6] top-full right-0 w-[141px] h-auto rounded-[8px] overflow-hidden flex flex-col gap-y-3">
            <div
              onClick={() => {
                router.push(`/dashboard/reports/${item?.id}`);
              }}
              className="cursor-pointer flex gap-x-3 items-center"
            >
              <Eye /> View
            </div>
            <a
              href={item?.files[0]?.url}
              target="_blank"
              rel="noopener"
              className="cursor-pointer flex gap-x-3 items-center"
            >
              <DownloadSimple /> Download
            </a>
            {/* <div className="cursor-pointer flex gap-x-3 items-center text-[#F04438]">
                <Trash /> Delete
              </div> */}
          </div>
        )}
      </span>
    </div>
  );
};

const Page = () => {
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [conversation, setConversation] = useState<any>(null);
  const [conversations, setConversations] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState<any>(null);
  const [text, setText] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [file, setFile] = useState<any>(null);
  const [filesreports, setFilesReports] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);


  const { data: subscriptionData, error } = useSubscription(NEW_MESSAGE, {
    variables: {
      input: {
        recipient: user?.id,
      },
    },

  });

  useEffect(() => {
    if (subscriptionData) {
      console.log(subscriptionData?.newMessage?.message);
      setMessages((prevMessages: any) => [
        ...prevMessages,
        subscriptionData?.newMessage?.message,
      ]);
    } else if (error) {
      console.log(error);
    }
  }, [subscriptionData, error]);


  const handleInputChange = (e: any) => {
    const selected = e.target.files[0];
    console.log(selected);
    setSelectedFile(selected);
  };

  useEffect(() => {
    const storedUser = localStorage?.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const {data:messagesData, error:messagesError,loading:messagesLoading} = useQuery(MESSAGES, {
    variables: {
      input: {
        // conversation: "650982e8fbbb0963e552658e",
        conversation: conversation?.id,
        limit: 100,
        sort: "asc",
      },
    },
    skip: !conversation,
  });

  useEffect(() => {
    console.log("massagesData",messagesData)
    setMessages(messagesData?.conversation?.data);
    setText("")
  }, [messagesData])

  useEffect(() => {
    console.log("massagesError", messagesError)
  }, [messagesError])
  
  
    // useEffect(() => {
    //   if (resp.data?.conversation?.code) {
    //     toast.error(resp.data?.conversation?.message);
    //   } else if (resp.data?.conversation?.data) {
    //     console.log(resp.data?.conversation?.data);
    //     setMessages(resp.data?.conversation?.data);
    //     setText("");
    //     messagesRef?.current?.scrollIntoView();
    //   }
    // }, [resp.data]);



  const {data:conversationData, error:conversationError,loading:conversationLoading} = useQuery(CONVERSATIONS, {
    variables: {
      input: {
        limit: 100,
        sort: "asc",
      },
    }
  });

  useEffect(() => {
    if (conversationData) {
      console.log(conversationData?.conversations?.data);
      const conversation = conversationData?.conversations?.data.filter(
        (conversation: any) => {
          return conversation.participants.find(
            (participant: any) => participant?.email === user?.email
          );
        }
      ) || []; 
      setConversations(conversation);
    }
  }, [conversationData]);

  useEffect(() => {
    if (conversationError) {
      console.log(conversationError);
      toast.error(conversationError?.message);
    }
  },[conversationError]);

  // useEffect(() => {
  //   console.log(res.data);

  //   if (res.data?.conversations?.code) {
  //     toast.error(res.data?.conversations?.message);
  //   } else if (res.data?.conversations?.data) {
  //     // console.log(res.data?.conversations?.data);
  //     setConversations(res.data?.conversations?.data);
  //   }
  // }, [res.data]);





  // useEffect(() => {
  //   if (result.data?.conversate?.code) {
  //     toast.error(result.data?.conversate?.message);
  //   } else if (result.data?.conversate?.data?.id) {
  //     // console.log(result.data?.conversate?.data?.id);
  //     setText("");
  //   }
  // }, [result.data]);

  const response = useQuery(GET_REPORTS_AND_FILES, {
    variables: {
      input: { limit: 100, paginate: true },
    },
  });

  // const router = useRouter();

  useEffect(() => {
    if (response.data?.getReportsAndFiles?.code) {
      toast.error(response.data?.getReportsAndFiles?.message);
    } else if (response.data?.getReportsAndFiles?.data) {
      setFilesReports(response.data?.getReportsAndFiles?.data);
      setPages(response.data?.getReportsAndFiles?.pagination?.pages);
    }
  }, [response.data]);

  useEffect(() => {
    messagesRef?.current?.scrollIntoView();
  }, [messages, userType]);

    const [conversate,{loading:conversateLoading,error:conversateError}] = useMutation(CONVERSATE, {
      onCompleted: (data) => {
        console.log(data);
          setText("");
          console.log(data.conversate?.data);
          setMessages((prevMessages: any) => [
            ...prevMessages,
            data.conversate?.data,
          ]);

      },
      onError: (error) => {
        console.log(error);
      }
    });

  const sendMessageHandler = async () => {
    if (!text && !selectedFile) return;
    
    let file = null
    if(selectedFile){
      console.log("uploading file...")
      file = await uploadFile(selectedFile);
      console.log(file)
    }

    try {
      // const { data } = await sendMessage({ variables: { text: messageText } });
      if (userType === "manager") {
        console.log(conversation.id)
        await conversate({
          variables: {
            input: {
              conversation: conversation?.id,
              // recipient: "64891480434ce1b0d1e5a819",
              text,
              attachment:file ? [file?.link] : null,
            },
          },
        }); 
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } 
  };

  useEffect(() => {
    setConversation(conversations[0]);
    if (conversations[0]) {
      setUserType("manager")
    }
  },[]);



  let officer = conversation?.participants?.find(
    (participant: any) => participant?.email !== user?.email
  );

  return (
    <div className="h-full  grid grid-cols-10 w-full  ">
      {/* pane 1 */}
      <div className=" col-span-2">
        <div className="p-6 font-semibold text-[20px] leading-[24px] text-[#060809] hidden md:block">
          Messages
        </div>
        {conversations.map((conversation: any) => {
          return (
            <div
              key={conversation?.id}
              onClick={() => {
                setUserType("manager");
                setConversation(conversation);
              }}
              className={`cursor-pointer relative flex gap-x-3 p-4 items-center text-[#3B3C41] shadow-[0_0_0_1px_#E7E7E7] ${
                userType === "manager" ? "bg-white text-[#071A7E]" : ""
              }`}
            >
              <Image
                alt="logo dashboard"
                src="/logomain.svg"
                height={40}
                width={40}
              />{" "}
              <span className="hidden md:block">
                {`${officer?.firstName || "Account"} ${
                  officer?.lastName || "Manager"
                }` || "Bimbo Ademoye"}
                {userType === "manager" && (
                  <span className="absolute w-1 h-10 left-[-1px] bg-[#071A7E] rounded-r-[20px]"></span>
                )}
              </span>
            </div>
          );
        })}
        {/* <div
          onClick={() => {
            setUserType("manager");
          }}
          className={`cursor-pointer relative flex gap-x-3 p-4 items-center text-[#3B3C41] shadow-[0_0_0_1px_#E7E7E7] ${
            userType === "manager" ? "bg-white text-[#071A7E]" : ""
          }`}
        >
          <Image
            alt="manager pic"
            src="/accountofficer.svg"
            height={40}
            width={40}
          />{" "}
          Account Manager
          {userType === "manager" && (
            <span className="absolute w-1 h-10 left-[-1px] bg-[#071A7E] rounded-r-[20px]"></span>
          )}
        </div> */}
        {/* <div
          onClick={() => {
            setUserType("ai");
          }}
          className={`relative cursor-pointer flex gap-x-3 p-4 text-[#3B3C41] items-center shadow-[0_0_0_1px_#E7E7E7] ${
            userType === "ai" ? "bg-white text-[#071A7E]" : ""
          }`}
        >
          <Image
            alt="logo dashboard"
            src="/logomain.svg"
            height={40}
            width={40}
          />{" "}
          AI
          {userType === "ai" && (
            <span className="absolute w-1 h-10 left-[-1px] bg-[#071A7E] rounded-r-[20px]"></span>
          )}
        </div> */}
      </div>
      {/* pane 2 */}
      {userType === "" ? (
        <div className="shadow-[0_0_0_1px_#E7E7E7] h-screen flex flex-col items-center justify-center px-2 gap-y-6 col-span-8 ">
          <Image alt="report" src="/emptychart.svg" height={172} width={104} />
          <div className="text-center">
            <p className="text-[14px] leading-[20px] max-w-[257px] text-[#060809]">
              Select user to start conversation
            </p>
          </div>
        </div>
      ) : (
        <div className="col-span-8 ">
          <div className="shadow-[0_0_0_1px_#E7E7E7] p-4 bg-white h-[74px] flex items-center justify-between">
            <div className="flex gap-x-2 items-center">
              <span>
                {userType === "manager" ? (
                  <span>
                    <span>
                      {`${officer?.firstName} ${officer?.lastName}` ||
                        "Bimbo Ademoye"}
                    </span>{" "}
                    <span>- Account Officer</span>
                  </span>
                ) : (
                  <span>AI Expert</span>
                )}
              </span>
            </div>
            <DotsThree size={32} />
          </div>
          {/* message pane */}
          <div className="grid grid-cols-8 w-full ">
            <div className="col-span-full lg:col-span-6 ">
              <div className="shadow-[0_0_0_1px_#E7E7E7] h-[75vh] px-6 py-10 bg-white overflow-auto ">
                {userType === "manager" ? (
                  // message box
                  <>
                    {messages?.map((message: any, i: number) => {
                      // console.log(message);
                      return (
                        <div
                          key={i}
                          className={twMerge(
                            user?.id === message?.sender?.id
                              ? "grid grid-cols-[1fr,40px] gap-x-2 mb-4"
                              : `grid grid-cols-[40px,1fr] gap-x-2 mb-4`
                          )}
                        >
                          {user?.id === message?.sender?.id ? (
                            <span className="font-migra text-[#060809] font-extrabold w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#FAEAD4] ">
                              {message?.sender?.firstName
                                ?.slice(0, 1)
                                .toUpperCase()}
                            </span>
                          ) : (
                            <span>
                              <Image
                                alt="manager pic"
                                src="/accountofficer.svg"
                                height={40}
                                width={40}
                              />
                            </span>
                          )}
                          <div
                            className={twMerge(
                              user?.id === message?.sender?.id && "order-first"
                            )}
                          >
                            <div className="flex flex-col rounded-[8px]">
                              <div
                                className={twMerge(
                                  user?.id === message?.sender?.id &&
                                    "text-right"
                                )}
                              >
                                {user?.id === message?.sender?.id ? (
                                  <span>{`You`}</span>
                                ) : (
                                  <div>
                                    <span className="text-[#060809]">
                                      {`${message?.sender?.firstName} ${message?.sender?.lastName}`}
                                    </span>{" "}
                                    <span className="text-[#555555B2] text-[12px] leading-[20px]">
                                      - Account Officer
                                    </span>
                                  </div>
                                )}
                              </div>
                              <span
                                className={twMerge(
                                  user?.id === message?.sender?.id
                                    ? "text-right text-[#555555CC] text-[12px] leading-[17px]"
                                    : `text-[#555555CC] text-[12px] leading-[17px]`
                                )}
                              >
                                {moment(message?.createdAt).fromNow() ||
                                  `5 minutes ago`}
                              </span>
                            </div>
                            <div className="flex flex-col rounded-[8px]">
                              <span className="p-4 bg-[#FAFBFC] text-[#060809] text-opacity-80 text-sm rounded-[32px]">
                                {message?.text}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesRef}></div>
                  </>
                ) : (
                  // message box
                  <div className="grid grid-cols-[40px,1fr] gap-x-2">
                    <span>
                      <Image
                        alt="manager pic"
                        src="/logomain.svg"
                        height={40}
                        width={40}
                      />
                    </span>
                    <div>
                      <div className="flex flex-col rounded-[8px]">
                        <span className="text-[#04050F] text-[16px] leading-[23px]">
                          how do I settle my tax?
                        </span>
                      </div>
                      <div className="flex flex-col rounded-[8px]">
                        <span className="p-4 bg-[#FAFBFC] text-[#060809] rounded-[32px]">
                          Here’s what happens next: You'll receive a call from
                          us to activate your free trial. On this call, we'll
                          chat about your business to make sure Accountable is
                          the right fit. Once we complete your free month of
                          bookkeeping, the Accounting section of your
                          Accountable account will populate with your
                          personalized data.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* textbox */}
              {selectedFile && (
                <div className="h-[40px] px-3 shadow-[0_0_0_1px_#E7E7E7] bg-white flex items-center justify-between">
                  <p className="text-sm font-medium">
                    Attached file: {selectedFile?.name}
                  </p>
                  <XCircle
                    size={20}
                    color="red"
                    onClick={() => setSelectedFile(null)}
                  />
                </div>
              )}

              <div className="h-[80px] shadow-[0_0_0_1px_#E7E7E7] bg-white pl-4 flex gap-x-2">
                <label
                  htmlFor="upload"
                  className="cursor-pointer flex items-center justify-center"
                >
                  <Paperclip size={23} />
                  <input
                    id="upload"
                    className="hidden"
                    type="file"
                    onChange={handleInputChange}
                  />
                </label>
                <span className="self-center">{file?.ext}</span>

                <div className="h-[80px] bg-white p-3 w-full">
                  <div className="cursor-pointer rounded-[100px] p-4 relative border-[1px] border-[#ABAEB4]">
                    <button
                      disabled={conversationLoading || conversateLoading}
                      onClick={sendMessageHandler}
                      className="absolute right-2 top-2 w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#071A7E] "
                    >
                      <PaperPlaneRight size={23} color="white" />
                    </button>

                    <input
                      className="bg-transparent outline-none placeholder:text-[#9597A0] w-full"
                      placeholder="Message your Accountable officer..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            {userType === "manager" ? (
              <div className="shadow-[0_0_0_1px_#E7E7E7] p-4 overflow-y-auto hidden lg:flex flex-col gap-y-2 col-span-2">
                {filesreports?.length !== 0 ? (
                  filesreports?.map((item: any, i: number) => (
                    <FileReport item={item} key={i} />
                  ))
                ) : (
                  <div className="flex flex-col h-full items-center justify-center px-2 gap-y-6 w-full  ">
                    <Image
                      alt="report"
                      src="/emptychart.svg"
                      height={172}
                      width={80}
                    />
                    <div className="text-center">
                      <p className="text-[10px] xl:text-sm leading-[20px]  text-[#060809]">
                        You can view all reports your account manager sends you
                        here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Page;

{
  /* <div className="grid grid-cols-[40px,1fr] gap-x-2">
                    <span>
                      <Image
                        alt="manager pic"
                        src="/accountofficer.svg"
                        height={40}
                        width={40}
                      />
                    </span>
                    <div>
                      <div className="flex flex-col rounded-[8px]">
                        <div className="flex gap-x-2 items-center">
                          <span>
                            {
                              userType === "manager" ? (
                                <span>
                                  <span className="text-[#060809]">
                                    Bimbo Ademoye
                                  </span>{" "}
                                  <span className="text-[#555555B2] text-[12px] leading-[20px]">
                                    - Account Officer
                                  </span>
                                </span>
                              ) : null
                              // <span>AI Expert</span>
                            }
                          </span>
                        </div>
                        <span className="text-[#555555CC] text-[12px] leading-[17px]">
                          5 minutes ago
                        </span>
                      </div>
                      <div className="flex flex-col rounded-[8px]">
                        <span className="p-4 bg-[#FAFBFC] text-[#060809] rounded-[32px]">
                          Here’s what happens next: You'll receive a call from
                          us to activate your free trial. On this call, we'll
                          chat about your business to make sure Accountable is
                          the right fit. Once we complete your free month of
                          bookkeeping, the Accounting section of your
                          Accountable account will populate with your
                          personalized data.
                        </span>
                      </div>
                    </div>
                  </div> */
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJpZCI6IjY1NTMzMWRiY2Y2ZDFiZDU2OWVhODJmNiIsImlhdCI6MTcwMTk2MjMwMiwiZXhwIjoxNzAyMDQ4NzAyLCJpc3MiOiJBY2NvdW50YWJsZSJ9
//   .jOQMsLFXiTHT40vDeSY9hegZdXOurL - MybG0vuYBkDs;