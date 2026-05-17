import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class DbCheck {
    public static void main(String[] args) {
        try (MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017")) {
            String[] dbs = {"docquintero", "consultorio_db"};
            for (String dbName : dbs) {
                System.out.println("Checking DB: " + dbName);
                MongoDatabase database = mongoClient.getDatabase(dbName);
                
                System.out.println(" Collections:");
                for (String name : database.listCollectionNames()) {
                    System.out.println(" - " + name + " (count: " + database.getCollection(name).countDocuments() + ")");
                    if (name.equals("patients") || name.equals("pacientes")) {
                         Document sample = database.getCollection(name).find().first();
                         if (sample != null) {
                             System.out.println("   Sample: " + sample.toJson());
                         }
                    }
                }
            }
        }
    }
}
