import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateLanguages } from "../../../Features/userSlice";

const LanguageDiv = ({ mode }) => {
    const selectedLang = useSelector((state) => state.user.languages);
    const dispatch = useDispatch();
    const [inpLang, setInpLang] = useState([...selectedLang]);
    const [showForm, setShowForm] = useState(false);

    const [lang] = useState([
        "Hindi",
        "English",
        "Punjabi",
        "Tamil",
        "Telugu",
        "Marathi",
        "Gujarati",
        "Bengali",
        "Kannada",
        "Bhojpuri",
        "Malayalam",
        "Urdu",
        "Haryanvi",
        "Rajasthani",
        "Odia",
        "Assamese",
    ]);

    const toggleForm = (event) => {
        event.stopPropagation();
        setShowForm((prev) => !prev);
    };

    const handleCheck = (event) => {
        event.stopPropagation();
        if (!event.target.checked) {
            const idx = inpLang.findIndex((l) => l === event.target.value);
            setInpLang((prev) => prev.filter((_, ind) => ind !== idx));
        } else {
            setInpLang((prev) => [...prev, event.target.value]);
        }
    };

    const handlelanguages = (event) => {
      event.stopPropagation();
        event.preventDefault();

        const checkboxes = event.target.querySelectorAll('input[name="languages"]');
        const checkedValues = [];

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                checkedValues.push(checkbox.value);
            }
        });
        dispatch(updateLanguages({ languages: checkedValues }));
        setShowForm(false);
    };
    return (
        <div className="sb04">
            <div onClick={toggleForm}>
                <div className="app03">
                    <div>{mode !== "mobile" && "Music"} Languages</div>
                    <div>
                        <i className={`fa-solid fa-chevron-${showForm ? "up" : "down"}`}></i>
                    </div>
                </div>
                <div className="sb16">{selectedLang.toString().replaceAll(",", ", ")}</div>
            </div>
            <div>
                {showForm && (
                    <form onSubmit={handlelanguages}>
                        {lang.map((item) => (
                            <label key={item} className="sb17" htmlFor={item}>
                                <input
                                    type="checkbox"
                                    onChange={handleCheck}
                                    value={item.toLowerCase()}
                                    checked={inpLang.some((val) => val === item.toLowerCase())}
                                    name="languages"
                                    id={item}
                                />
                                <span className="sb18">{item}</span>
                            </label>
                        ))}
                        <div className="w-100 app02">
                            <button className=" w-100 sb15" type="submit">Update</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LanguageDiv;
