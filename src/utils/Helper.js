import dateFormat from "dateformat";

const Helper = {
    timeToReadCalculator: (post) => {
        const titleLength = post.title.length;
        const descriptionLength = post.description.length;
        const contentLength = post.content.length;
        const totalLength = titleLength + descriptionLength + contentLength;

        const timeToRead = totalLength / 200;

        if (timeToRead < 1) {
            const intPart = Math.trunc(timeToRead); // returns 3
            const floatPart = Number((timeToRead-intPart).toFixed(2));
            return Number(floatPart * 0.6).toFixed(2);
        }
        return timeToRead;
    }
    ,
    formatCreatedDate: (date) => {
        let dateObject = new Date(date);
        let datePart = dateFormat(dateObject, "dddd, mmmm d, yyyy ");
        let timePart = dateFormat(dateObject, "HH:MM:ss");
        return `${datePart} at ${timePart}`;
    }
    ,
    getTodayDateTime: (date) => {
        let today = new Date(date);
        let datePart = dateFormat(today, 'yyyy-mm-dd');
        let timePart = dateFormat(today, 'HH:mm');
        return `${datePart}T${timePart}`;
    }
    ,
    getDefaultDateTime: () => {
        let today = new Date();
        let datePart = dateFormat(today, 'yyyy-mm-dd');
        let timePart = dateFormat(today, 'HH:mm');
        return `${datePart}T${timePart}`;
    }
}


export default Helper;

