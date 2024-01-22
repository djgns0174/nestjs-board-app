import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { get } from 'http';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
    boardsService: any;
    // constructor(private boardsService: BoardsService){

    // }

    @Get()
    getAllBoard():Promise<Board[]>{
        return this.boardsService.getAllBoards();
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto:CreateBoardDto
    //     ):Board{
    //     return this.boardsService.createBoard(createBoardDto);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body()createBoardDto:CreateBoardDto):Promise<Board>{
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id')id:number):Promise<Board>{
        return this.boardsService.getBoardById(id);
    }
    // @Get('/:id')
    // getBoardById(@Param('id')id: string):Board{
    //     return this.boardsService.getBoardById(id);
    // }

    @Delete('/:id')
    deleteBoard(@Param('id',ParseIntPipe)id):Promise<void>{
        return this.boardsService.deleteBoard(id);
    }

    // @Get('/:id')
    // deletedById(@Param('id')id:string):void{
    //     this.boardsService.deletedById(id);
    // }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id',ParseIntPipe)id:number,
        @Body('status')status:BoardStatus
    ){
        return this.boardsService.updateBoardStatus(id, status);
    }
    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id')id:string ,
    //     @Body('status')status:BoardStatus
    // ){
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
}