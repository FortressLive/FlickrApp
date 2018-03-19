
export class Image{

    public constructor(private m_id: string,
        private m_owner: string,
        private m_server: string,
        private m_secret: string,
        private m_farm: string,
        private m_title: string,
        private m_isPublic: string,
        private m_isFriend: string,
        private m_isFamily: string){

        }

    public get id():string{
        return this.m_id;
    }

    public get owner(): string{
        return this.m_owner;
    }

    public get server(): string{
        return this.m_server;
    }

    public get secret(): string{
        return this.m_secret;
    }

    public get farm():string{
        return this.m_farm;
    }

    public get title(): string {
        return this.m_title;
    }

    public get isPublic():string{
        return this.m_isPublic;
    }

    public get isFriend(): string{
        return this.m_isFriend;
    }

    public get isFamily():string{
        return this.m_isFamily;
    }

    public toString(): string{
        return `${this.m_id} + ${this.m_owner} + ${this.m_secret} + ${this.m_server} + ${this.m_farm} + ${this.m_title}`;
    }
}