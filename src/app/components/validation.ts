
import * as yup from 'yup';

// const StatusEnum = [
//     'high',
//     'medium',
//     'low',
// ]

enum StatusEnum {
    high = 'High',
    medium = 'Medium',
    low = 'Low',
}

export const todoCreateSchema = yup
.object({
    task: yup.string().required(),
    date: yup.date().required(),
    priority: yup.mixed().oneOf<StatusEnum>(Object.values(StatusEnum) as StatusEnum[]),
    patient: yup.number().required(),
    assignee: yup.number().required(),
})
.required();

export const reminderCreateSchema = yup
.object({
    name: yup.string().required(),
    patient: yup.number().required(),
    date: yup.date().required(),
    time: yup.string().required().length(5)
    .matches(/(\d){2}:(\d){2}/, 'Hour must have this pattern "00:00"'),
})
.required();

export const alertCreateSchema = yup
.object({
    name: yup.string().required(),
    patient: yup.number().required(),
    date: yup.date().required(),
    time: yup.string().required().length(5)
    .matches(/(\d){2}:(\d){2}/, 'Hour must have this pattern "00:00"'),
})
.required();

export const randomTaskCreateSchema = yup
.object({
    name: yup.string().required(),
})
.required();


const MAX_FILE_SIZE = 1024 * 1024 * 5; //1MB

const validFileExtensions :any = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

function isValidFileType(fileName: string, fileType: string) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}


export const patientCreateSchema = yup
.object({
    name: yup.string().required(),
    dob: yup.date().required(),
    address: yup.string().required(),
    anotherAddress: yup.string().required(),
    details: yup.string().required(),
    medicalReports:yup.array()
    .of( yup.mixed()
        .test("fileSize", "Max allowed size is 5MB", (value : any) => {
            if(value && value?.length>0){
                for (let i=0;i<value.length;i++){
                    if(value[i].size>MAX_FILE_SIZE){
                        return false;
                    }
                }
            }
            return true;
        })
        .test("fileType", "Unsupported File Format", (value : any) =>{
            if(value && value.length>0){
                for (let i=0;i<value.length;i++){
                    isValidFileType(value[i] && value[i].name.toLowerCase(), "image")
                    // if(value[i].type!= "image/png" && value[i].type!= "image/jpg" && value[i].type!= "image/jpeg"){
                    //     return false;
                    // }
                }
            }
            return true;
        })
    ),
    careTeam:yup.array().min(1, 'Pick at least one team member').of(yup.object()
            .shape({
                label: yup.string().required(),
                value: yup.string().required(),
            })
    ),
    reminder: yup.array().of(
        yup.object().shape({
            name: yup.string().required(),
            date: yup.date().required(),
            time: yup.string().required().length(5)
            .matches(/(\d){2}:(\d){2}/, 'Hour must have this pattern "00:00"'),
        })
    ),
    alert: yup.array().of(
        yup.object().shape({
            name: yup.string().required(),
            date: yup.date().required(),
            time: yup.string().required().length(5)
            .matches(/(\d){2}:(\d){2}/, 'Hour must have this pattern "00:00"'),
        })
    ),
    // todo: yup.array()
    //   .of(
    //     yup.object().shape({
    //         task: yup.string().required(),
    //         date: yup.date().required(),
    //         priority: yup.mixed().oneOf<StatusEnum>(Object.values(StatusEnum) as StatusEnum[]),
    //         assignee: yup.number().required(),
    //     })
    // )
    // todo: yup.object().shape({
        // task: yup.string().when(["task"],(val) => {
        //     // console.log(val)
        //     if(val[0] != "" && val?.length > 0) {  //if address exist then
        //         return yup.string().required();
        //     } else { 
        //         return yup.string().notRequired();
        //     }
        // }),
        task: yup.string().when({
            is: (exists: any) => !!exists,
            then: (rule) =>
                rule.required(),
        }),
        // task: yup.string().when("task", (value) => {
        //     if (value) {
        //       return yup
        //         .string()
        //         .min(5, "Address must be more than 5 characters long")
        //         .max(255, "Address must be less than 255 characters long");
        //     } else {
        //       return yup
        //         .string()
        //         .transform((value, originalValue) => {
        //           // Convert empty values to null
        //           if (!value) {
        //             return null;
        //           }
        //           return originalValue;
        //         })
        //         .nullable()
        //         .optional();
        //     }
        // }),
        date: yup.date().when("task",(val) => {
            if(val[0] != "" && val?.length > 0) {  //if address exist then
                return yup.date().required();
            } else { 
                return yup.date().notRequired();
            }
        }),
        priority: yup.mixed().when("task",(val) => {
            if(val[0] != "" && val?.length > 0) {  //if address exist then
                return yup.mixed().oneOf<StatusEnum>(Object.values(StatusEnum) as StatusEnum[]).required();
            } else { 
                return yup.mixed().notRequired();
            }
        }),
        assignee: yup.number().when("task",(val) => {
            if(val[0] != "" && val?.length > 0) {  //if address exist then
                return yup.number().required();
            } else { 
                return yup.number().notRequired();
            }
        }),
        // }),
        
}).required();