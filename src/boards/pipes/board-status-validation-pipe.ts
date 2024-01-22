import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform{
    readonly StatusOption =[
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();

        if(!value.isStatusValid()){
            throw new BadRequestException(`${value}is't in the status option`);
        }
    }

    isStatusValid(status:any):boolean{
        const index = this.StatusOption.indexOf(status);
        return index !== -1;
    }
}