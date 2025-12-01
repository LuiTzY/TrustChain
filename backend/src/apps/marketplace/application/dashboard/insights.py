class GetInsigthsService:
    
     
    def __init__(self, insigths_repo):
        self.repo =  insigths_repo
        
    
    def execute(self):
        return self.repo.get_insigths()