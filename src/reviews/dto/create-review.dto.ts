export class CreateReviewDto {
    readonly tourId: number;
    readonly userId: number;
    readonly reservationId: number;
    readonly comment: string;
    readonly star: string;
    readonly image: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}