import { Resolver } from '@nestjs/graphql';
import { ItemService } from '../../services/item/item.service';

@Resolver()
export class ItemResolver {
    constructor(private readonly itemService: ItemService) {}
}
