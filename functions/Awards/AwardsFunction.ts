import { Award, listAwards } from 'services/Awards/awards.service';
import { MultipleElements } from 'services/generical.service';

const AwardsFunction = () => {
    const ListAwards= async(params:string): Promise<MultipleElements<Award>>=>{
            try{
                const res= await listAwards(params)

                console.log(res)
    
                return res
            }catch (err) {
                console.error(err);
                throw err;
              }
        }


        return {ListAwards}
};

export default AwardsFunction;