export const validateForm = (data) => {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            if(!element || (key === "sol" && element < 0) || (key === "sol" && element > 1000) || (key === "camera" && element === "Select a camera")) {
                return document.getElementById(`${key}-error`).style.display='block'
            } else {
                document.getElementById(`${key}-error`).style.display='none'
            }
        }
    }
}