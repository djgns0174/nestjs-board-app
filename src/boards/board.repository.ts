import { Repository } from "typeorm/repository/Repository";
import { Board } from "./board.entity";
import { EntityRepository } from "typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";

@EntityRepository()
export class BoardRepository extends Repository<Board> {
    async createBoard(createBoardDto:CreateBoardDto):Promise<Board>{
        const title = createBoardDto.title;
        const description = createBoardDto.description;
        //const{title,description} = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.save(board);
        return board;
    }
}
