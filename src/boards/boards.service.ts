import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { NotFoundError } from 'rxjs';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
@Injectable()
export class BoardsService {
    private boardRepository : BoardRepository;
    constructor(boardRepository: BoardRepository) {
        this.boardRepository = boardRepository;
    }

    async getAllBoards()  : Promise<Board[]> {
        return this.boardRepository.find();
    }
    // getAllBoards()  : Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDto:CreateBoardDto){
    //     const {title, description} = createBoardDto;
    //      const board: Board={
    //         id: uuid(),
    //         title,
    //         description,
    //         status:BoardStatus.PUBLIC
    //      }
    //      this.boards.push(board);
    //      return board;
    // }

    createBoard(createBoardDto: CreateBoardDto):Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto);
    }

    async getBoardById(id): Promise <Board>{    //매개변수에 :number하면 에러나옴 02:56:20
        const found = await this.boardRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Cant find board with id${id}`);
        }

        return found;
    }
    // getBoardById(id:string){
    //     const found = this.boards.find((board)=>board.id === id);

    //     if(!found){
    //         throw new NotFoundException(`Cant find board with id${id}`);
    //     }

    //     return found;
    // }

    async deleteBoard(id:number):Promise<void>{
        const result = await this.boardRepository.delete(id);
        if(result.affected==0){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        //console.log('result',result);
    }

    // deletedById(id:string):void{
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board)=>board.id!==found.id);
    // }

    async updateBoardStatus(id:number, status:BoardStatus):Promise<Board>{
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }

    // updateBoardStatus(id:string, status:BoardStatus):Board{
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}