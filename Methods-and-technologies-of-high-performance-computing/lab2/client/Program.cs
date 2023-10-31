using System;
using System.ServiceModel;

class Client
{
    static void Main()
    {
        ChannelFactory<IRemoteService> factory = new ChannelFactory<IRemoteService>(
            new WSHttpBinding(),
            "http://localhost:1234/RemoteService"
        );
        IRemoteService proxy = factory.CreateChannel();

        string result = proxy.DoSomething();
        Console.WriteLine("Результат: " + result);

        ((IClientChannel)proxy).Close();
    }
}
