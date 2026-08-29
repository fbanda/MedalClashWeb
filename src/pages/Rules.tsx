import {DocumentIcon} from "../Icons.tsx";
import {Link} from "react-router-dom";

export const Rules = () => {
  return (
      <div className={"mt-12 p-4"}>
        <div className={"mb-4"}>
          <p className={"text-left font-bold"}>Basic Tutorial Video</p>
        </div>
        <div>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/eVTXPUF4Oz4?si=4VO-qFCOUJwQOGOr"
                  title="YouTube video player" frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen></iframe>
        </div>
        <div className={"my-4"}>
          <p className={"flex items-center gap-2 text-left font-bold"}>
            <span>Rulebook</span>
            <a href="https://pdfobject.com/pdf/sample.pdf" target={"_blank"} download="Nombre_Del_Archivo.pdf">
              <DocumentIcon/>
            </a>
          </p>
        </div>
        <div className={"my-4"}>
          <p className={"flex items-center gap-2 text-left font-bold"}>
            <span>Keyword Rulings</span>
            <a href="https://pdfobject.com/pdf/sample.pdf" target={"_blank"} download="Nombre_Del_Archivo.pdf">
              <DocumentIcon/>
            </a>
          </p>
        </div>
        <div className={"my-4"}>
          <p className={"text-left"}>
            <span className={"font-bold me-2"}>Card Ruling:</span>
            <span>
              For individual card rulings, search for the cards <Link className={"underline"} to={"/"}>here</Link> and scroll to the ruling section.
            </span>
          </p>
        </div>
      </div>
  )
}