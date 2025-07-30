export interface ResponseGetFeedbackByProductId {
    data: {
        content: ContentFeedback[]
 
    }
    
}


export interface UserFeedback {
    fullName: string,
    id: string
}

export interface ContentFeedback {
    id: string,
    content: string,
    rating: number,
    createdAt: string,
    user: UserFeedback ,
    isReviewed:boolean
}