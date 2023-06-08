import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "../entitys/address.entity";
import { Repository } from "typeorm";
import { EncryptionService } from "src/services/encryption.service";
import { AddressDto } from "../dto/AddressDto";

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        private encryptionService: EncryptionService,
    ) { }

    async createAddress(addressDto: AddressDto): Promise<Address> {

        this.encryptAdressData(addressDto)

        const newAddresses = this.addressRepository.create(addressDto)
        await this.addressRepository.save(newAddresses);
        return newAddresses
    }

    private encryptAdressData(address: Partial<Address>) :void {
        address.city = this.encryptionService.encryptField(address.city)
        address.country = this.encryptionService.encryptField(address.country)
        address.street = this.encryptionService.encryptField(address.street)
    }

}